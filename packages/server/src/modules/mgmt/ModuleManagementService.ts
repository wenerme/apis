import { getBootService, loadImportOverrides, ModuleService, persistImportOverrides } from 'src/modules/boot';
import ModuleMetas from './modules.json';

export interface ModuleInfo {
  name;
  resolved?;
  internal?: boolean;
  predefined?: boolean;
  override?: boolean;
  loaded?;
  metadata?;
  hasMetadata?: boolean;

  loading?;
  version?;

  source?: string;

  dependencies?: string[];
  dependents?: string[];

  size?: number;
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
  private _modules: ModuleService = this._boot.modules;
  private System = this._boot.System;

  async addOverrideModule({ name, resolved }) {
    this._modules.overrides[name] = resolved;
    await this.persistImportOverrides();
  }
  async removeOverrideModule({ name }) {
    delete this._modules.overrides[name];
    await this.persistImportOverrides();
  }
  async resetOverrideModules() {
    this._modules.overrides = {};
    await this.persistImportOverrides();
  }

  async loadImportOverrides() {
    Object.assign(this._modules.overrides, await loadImportOverrides());
  }

  async persistImportOverrides() {
    return await persistImportOverrides(this._modules.overrides);
  }

  getModules(): ModuleInfo[] {
    const { System, _modules } = this;

    let all: ModuleInfo[] = [];
    all = all.concat(
      Object.entries(_modules.imports).map(([name, resolved]) => ({
        name,
        resolved,
        predefined: true,
      })),
    );
    {
      // 使用预先有的元数据覆盖
      const byName = keyBy(all, 'name');
      for (const v of ModuleMetas) {
        const m = (byName[v.name] = byName[v.name] || { name: v.name, resolved: _modules.tryResolve(v.name) });
        Object.assign(m, v);
      }
      // 添加 override 信息
      for (const [name, resolved] of Object.entries(_modules.overrides)) {
        byName[name] = Object.assign(byName[name] || {}, { name, resolved, override: true });
      }
      all = Object.values(byName);
    }

    const byResolved = keyBy(all, 'resolved');

    for (const [url, mod] of System.entries()) {
      // maybe deleted
      if (!mod) {
        continue;
      }
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
      v.dependencies = Array.from(_modules.dependencies[v.name] || []);
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
