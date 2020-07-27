import { BootService } from 'src/modules/boot/BootService';
import imports from './imports.json';
import { ModuleResolver } from 'src/modules/boot/ModuleService';
import { loadImportOverrides } from 'src/modules/boot/overrides';

let _bootService;

export function getBootService(): BootService {
  return _bootService;
}

export interface BootstrapOptions {
  dev?: boolean;
  internals?: RegExp[];
  baselUrl?: string;
  resolver: ModuleResolver;
}

export async function boot(opts: BootstrapOptions) {
  console.info(`Bootstrapping system`);

  const bootService = new BootService(opts);
  _bootService = bootService;

  const modules = bootService.modules;
  modules.resolver = opts.resolver;
  modules.dev = opts.dev;
  if (opts.internals) {
    modules.internals.push(...opts.internals);
  }
  // preset imports
  Object.assign(modules.imports, imports);
  // override works
  Object.assign(modules.overrides, await loadImportOverrides());

  console.info(`Injecting system resolve`);

  const System = window['System'];
  const originalResolve = System.constructor.prototype.resolve;
  System.constructor.prototype.resolve = function (id, parentUrl) {
    const resolved = modules.resolve({
      id,
      parentUrl,
      original: (...args) => originalResolve.apply(this, args),
    });
    console.debug(`resolve ${id} to ${resolved} from ${parentUrl}`);
    return resolved;
  };
}
