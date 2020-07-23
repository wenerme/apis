import { getBootService, normalizeModuleUrl } from 'src/modules/boot';
import ModuleMetas from './modules.json';

export interface ModuleInfo {
  name;
  resolved?;
  internal?: boolean;
  predefined?: boolean;
  loaded?;
  metadata?;
  hasMetadata?: boolean;

  loading?;
  version?;

  source?: string;

  dependencies?: string[];
  dependents?: string[];
}

export function getVersionFromResolvedUrl(url) {
  const jsdelivr = 'https://cdn.jsdelivr.net/npm/';
  if (url.startsWith(jsdelivr)) {
    const m = url.substr(jsdelivr.length).match(/(^@[^/]+[/])?[^/@]+@([^/]+)/);
    if (m) {
      return m[2];
    }
  }

  return 'latest';
}

export function getSourceFromResolvedUrl(url) {
  const jsdelivr = 'https://cdn.jsdelivr.net/npm/';
  if (url.startsWith(jsdelivr)) {
    return 'jsdelivr';
  }
  const unpkg = 'https://unpkg.com/';
  if (url.startsWith(unpkg)) {
    return 'unpkg';
  }
  if (url.startsWith(location.origin)) {
    return 'site';
  }
  // ignore 172
  if (/^https?:\/\/(localhost|127\.0\.0|192\.168|10\.)/.test(url)) {
    return 'localhost';
  }
  return 'unknown';
}

export class ModuleManagementService {
  private _boot = getBootService();
  private _modules = this._boot.modules;
  private System = this._boot.System;

  getModules(): ModuleInfo[] {
    const { System, _modules } = this;

    let all: ModuleInfo[] = [];
    all = all.concat(
      Object.entries(_modules.imports).map(([name, resolved]) => ({
        name,
        resolved: normalizeModuleUrl(resolved),
        predefined: true,
      })),
      Object.entries(_modules.dynamics).map(([name, resolved]) => ({
        name,
        resolved: normalizeModuleUrl(resolved),
        predefined: false,
      })),
    );
    {
      const byName = keyBy(all, 'name');
      for (const v of ModuleMetas) {
        let m = byName[v.name];
        if (!m) {
          m = { ...v, resolved: _modules.tryResolve(v.name) };
          all.push(m);
        } else {
          Object.assign(m, v);
        }
      }
    }
    const byResolved = keyBy(all, 'resolved');

    for (const [url, mod] of System.entries()) {
      const info = (byResolved[url] = byResolved[url] || { name: _modules.resolveName(url) || url, resolved: url });
      info.loaded = true;

      // load metadata
      if (_modules.isInternal(info.name)) {
        info.metadata = mod.metadata || {};
      }
    }

    all = Object.values(byResolved);
    all.forEach((v) => {
      v.internal = _modules.isInternal(v.name);
      v.hasMetadata = Boolean(Object.keys(v.metadata || {}).length);
      v.source = getSourceFromResolvedUrl(v.resolved);
      v.version = getVersionFromResolvedUrl(v.resolved);
      v.dependencies = _modules.dependencies[v.name] || [];
    });

    const dependents = {};
    all
      .flatMap(({ name, dependencies }) => dependencies.map((v) => [v, name]))
      .reduce((v, [a, b]) => {
        (v[a] = v[a] || []).push(b);
        return v;
      }, dependents);
    all.forEach((v) => {
      v.dependents = dependents[v.name] || [];
    });
    return all;
  }
}

function keyBy(o: any[], key) {
  return Object.fromEntries(o.map((v) => [v[key], v]));
}