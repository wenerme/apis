import { ModuleService } from 'src/modules/boot/ModuleService';
import { System } from './types';

const key = 'ImportOverrides';

export class BootService {
  readonly modules = new ModuleService();
  readonly System: System;
  readonly baselUrl: string;

  constructor({ System = window['System'], baselUrl = location.origin } = {}) {
    this.baselUrl = baselUrl;
    this.System = System;
  }

  resolvePath(v: string): string {
    return new URL(v, this.baselUrl).href;
  }

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
