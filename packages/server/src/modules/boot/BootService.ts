import { ModuleService } from 'src/modules/boot/ModuleService';
import type System from 'systemjs';

export class BootService {
  readonly modules = new ModuleService();
  readonly System = window['System'] as System;
}
