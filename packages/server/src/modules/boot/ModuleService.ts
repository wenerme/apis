export interface ModuleResolveOptions {
  /// @wener/ui/icons
  name: string;
  parentName?: string;
  parentUrl?: string;
  dev?: boolean;
}

export type ModuleResolver = (opts: ModuleResolveOptions) => string;

export class ModuleService {
  internals: RegExp[] = [];
  resolver: ModuleResolver;
  dev = false;
  readonly overrides: Record<string, string> = {};
  readonly imports: Record<string, string> = {};
  readonly resolved: Record<string, string> = {};
  readonly dependencies: Record<string, string[]> = {};

  isInternal(id) {
    const { internals } = this;
    for (const regex of internals) {
      if (regex.test(id)) {
        return true;
      }
    }
    return false;
  }

  resolve({ id, parentUrl = undefined, original = undefined }) {
    let resolved = this.tryResolve(id);
    if (!resolved) {
      try {
        resolved = original(id, parentUrl);
      } catch (err) {
        console.error(`fallback to jsdelivr resolve - `, id);
        resolved = `https://cdn.jsdelivr.net/npm/${id}`;
      }
    }
    if (parentUrl) {
      const parentName = this.resolveName(parentUrl);
      if (!parentName) {
        console.warn('can not get name from parent url', parentUrl);
      } else {
        const deps = (this.dependencies[parentName] = this.dependencies[parentName] || []);
        deps.includes(id) || deps.push(id);
      }
    }
    this.resolved[id] = resolved;
    return resolved;
  }

  tryResolve(id: string, parentUrl?): string | undefined {
    const { overrides, imports } = this;
    // existing
    const r = overrides[id] || imports[id];
    if (r) {
      return this.normalizeModuleUrl(r);
    }
    // internals
    if (this.resolver && this.isInternal(id)) {
      return this.resolver({ dev: this.dev, name: id, parentUrl, parentName: this.resolveName(parentUrl) });
    }
  }

  /**
   * url to module name
   */
  resolveName(url: string): string | undefined {
    if (!url) {
      return;
    }
    {
      const e = Object.entries(this.resolved).find(([_, v]) => v === url);
      if (e) {
        return e[0];
      }
    }

    const local = location.origin;
    if (url.startsWith(local)) {
      // under the modules path
      const m = url.substr(local.length).match(/modules[/](\w+)-([^.]+)/);
      if (m) {
        return `@${m[1]}/${m[2]}`;
      }
    }
    const jsdelivr = 'https://cdn.jsdelivr.net/npm/';
    if (url.startsWith(jsdelivr)) {
      const m = url.substr(local.length).match(/(@[^/]+[/][^/]+)/);
      if (m) {
        return m[1];
      }
    }
    let found = Object.entries(this.imports).find(([_, v]) => v === url)?.[0];
    if (found) {
      return found;
    }
    found = Object.entries(this.resolved).find(([_, v]) => v === url)?.[0];
    return found;
  }

  private normalizeModuleUrl(v) {
    // placeholder
    // /modules/test.js -> ${baseUrl}/modules/test.js
    return v;
  }
}
