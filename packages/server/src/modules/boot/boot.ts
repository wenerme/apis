import { BootService } from 'src/modules/boot/BootService';
import imports from './imports.json';

let _bootService;

export function getBootService() {
  return _bootService;
}

export async function boot() {
  console.info(`Bootstrapping system`);

  const bootService = new BootService();
  _bootService = bootService;

  const modules = bootService.modules;
  modules.internals.push(/^@wener[/]apis-(.+)/);
  Object.assign(modules.imports, imports);

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
