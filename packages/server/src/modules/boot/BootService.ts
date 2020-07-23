import { ModuleService } from 'src/modules/boot/ModuleService';
// index.d.ts is not a module.
// import type { System } from 'systemjs';
export interface System {
  import: System.ImportFn;

  register(dependencies: string[], declare: System.DeclareFn): void;

  register(name: string, dependencies: string[], declare: System.DeclareFn): void;

  resolve(moduleId: string, parentUrl?: string): string;

  delete(moduleId: string): false | System.UpdateModuleFn;

  get(moduleId: string): System.Module | null;

  get<T>(moduleId: string): T | null;

  has(moduleId: string): boolean;

  set(moduleId: string, module: System.Module): void;

  entries(): Iterable<[string, System.Module]>;
}

const key = 'ImportOverrides';

export class BootService {
  readonly modules = new ModuleService();
  readonly System = window['System'] as System;

  async loadImportOverrides() {
    try {
      Object.assign(this.modules.overrides, JSON.parse(localStorage[key] || '{}'));
    } catch (e) {
      console.error(`failed to load overrides`, e);
    }
  }

  async persistImportOverrides() {
    localStorage[key] = JSON.stringify(this.modules.overrides);
  }
}
