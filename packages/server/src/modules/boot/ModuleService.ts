export class ModuleService {
  internals: RegExp[] = [];
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

  tryResolve(id: string, parent?): string | undefined {
    const { overrides, imports } = this;
    // existing
    const r = overrides[id] || imports[id];
    if (r) {
      return normalizeModuleUrl(r);
    }
    // internals
    if (this.isInternal(id)) {
      return normalizePackageName(id);
    }
  }

  resolveName(url: string): string | undefined {
    {
      const e = Object.entries(this.resolved).find(([_, v]) => v === url);
      if (e) {
        return e[0];
      }
      console.warn(`Not found for `, url);
    }

    const local = `${location.origin}/modules/`;
    if (url.startsWith(local)) {
      const m = url.substr(local.length).match(/(\w+)-([^.]+)/);
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
}

export function normalizeModuleUrl(url) {
  if (url.startsWith('/')) {
    return `${location.origin}${url}`;
  }
  return url;
}

function normalizePackageName(id, { format = 'system' } = {}) {
  const name = id.replace('@', '').replace(/[/]/g, '-');
  return `${location.origin}/modules/${name}.${format}.js`;
}
