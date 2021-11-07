import React from 'react';
import create from 'zustand/vanilla';
export interface Module {
  name: string; // identifier
  title?: string;
  description?: string;
  icon?: React.ReactElement;
  [k: string]: any;
}

export function defineModule(def: Module): Module {
  moduleStore.getState().registerModule(def);
  return def;
}

export interface ModuleStore {
  modules: Module[];
  registerModule(def: Module): void;
}

export const moduleStore = create<ModuleStore>((set, get) => {
  return {
    modules: [],
    registerModule(mod: Module) {
      const last = get().modules.find((v) => v.name === mod.name);
      if (!mod.name) {
        throw new Error(`module missing name`);
      }
      if (last) {
        throw new Error(`module ${mod.name} already exists`);
      }
      set((v) => {
        v.modules.push(mod);
      });
    },
  };
});
