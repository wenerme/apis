import { ModuleService } from 'src/modules/boot/ModuleService';
import { System } from './types';

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
}
