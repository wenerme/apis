import { ModuleService } from 'src/modules/boot/ModuleService';
import type System from 'systemjs';

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
