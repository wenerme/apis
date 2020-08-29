System.register([], function (exports) {
  'use strict';
  return {
    execute: function () {

      exports({
        boot: boot,
        getBaseUrl: getBaseUrl,
        getBootService: getBootService,
        loadImportOverrides: loadImportOverrides,
        persistImportOverrides: persistImportOverrides,
        resolvePath: resolvePath
      });

      class ModuleService {
        constructor() {
          this.internals = [];
          this.resolver = void 0;
          this.dev = false;
          this.overrides = {};
          this.imports = {};
          this.resolved = {};
          this.dependencies = {};
        }

        isInternal(id) {
          const {
            internals
          } = this;

          for (const regex of internals) {
            if (regex.test(id)) {
              return true;
            }
          }

          return false;
        }

        resolve({
          id,
          parentUrl = undefined,
          original = undefined
        }) {
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
              const deps = this.dependencies[parentName] = this.dependencies[parentName] || [];
              deps.includes(id) || deps.push(id);
            }
          }

          this.resolved[id] = resolved;
          return resolved;
        }

        tryResolve(id, parentUrl) {
          const {
            overrides,
            imports
          } = this; // existing

          const r = overrides[id] || imports[id];

          if (r) {
            return this.normalizeModuleUrl(r);
          } // internals


          if (this.resolver && this.isInternal(id)) {
            return this.resolver({
              dev: this.dev,
              name: id,
              parentUrl,
              parentName: this.resolveName(parentUrl)
            });
          }
        }
        /**
         * url to module name
         */


        resolveName(url) {
          var _Object$entries$find, _Object$entries$find2;

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

          let found = (_Object$entries$find = Object.entries(this.imports).find(([_, v]) => v === url)) === null || _Object$entries$find === void 0 ? void 0 : _Object$entries$find[0];

          if (found) {
            return found;
          }

          found = (_Object$entries$find2 = Object.entries(this.resolved).find(([_, v]) => v === url)) === null || _Object$entries$find2 === void 0 ? void 0 : _Object$entries$find2[0];
          return found;
        }

        normalizeModuleUrl(v) {
          // placeholder
          // /modules/test.js -> ${baseUrl}/modules/test.js
          return v;
        }

      } exports('ModuleService', ModuleService);

      class BootService {
        constructor({
          System = window['System'],
          baselUrl = location.origin
        } = {}) {
          this.modules = new ModuleService();
          this.System = void 0;
          this.baselUrl = void 0;
          this.baselUrl = baselUrl;
          this.System = System;
        }

        resolvePath(v) {
          return new URL(v, this.baselUrl).href;
        }

      }

      var react = "https://cdn.jsdelivr.net/npm/react@16.13.1/umd/react.production.min.js";
      var classnames = "https://cdn.jsdelivr.net/npm/classnames";
      var immer = "https://cdn.jsdelivr.net/npm/immer/dist/immer.umd.production.min.js";
      var lodash = "https://cdn.jsdelivr.net/npm/@esm-bundle/lodash/system/index.js";
      var tslib = "https://cdn.jsdelivr.net/npm/tslib/tslib.js";
      var antd = "https://cdn.jsdelivr.net/npm/antd@4.4.2/dist/antd-with-locales.min.js";
      var moment = "https://cdn.jsdelivr.net/npm/@esm-bundle/moment/system/index.js";
      var rxjs = "https://cdn.jsdelivr.net/npm/rxjs@6.6.0/bundles/rxjs.umd.min.js";
      var imports = {
      	react: react,
      	"react-dom": "https://cdn.jsdelivr.net/npm/react-dom@16.13.1/umd/react-dom.production.min.js",
      	classnames: classnames,
      	"@ant-design/colors": "https://cdn.jsdelivr.net/npm/@ant-design/colors",
      	"react-query": "https://cdn.jsdelivr.net/npm/react-query@2.5.5/dist/react-query.production.min.js",
      	"react-router-dom": "https://cdn.jsdelivr.net/npm/react-router-dom@5.2.0/umd/react-router-dom.min.js",
      	immer: immer,
      	"prop-types": "https://cdn.jsdelivr.net/npm/prop-types@15.7.2/prop-types.min.js",
      	lodash: lodash,
      	"react-is": "https://cdn.jsdelivr.net/npm/react-is/umd/react-is.production.min.js",
      	"styled-components": "https://cdn.jsdelivr.net/npm/@esm-bundle/styled-components/system/styled-components.min.js",
      	tslib: tslib,
      	"@ant-design/icons": "https://cdn.jsdelivr.net/npm/@ant-design/icons@4.2.1/dist/index.umd.min.js",
      	antd: antd,
      	moment: moment,
      	"single-spa": "https://cdn.jsdelivr.net/npm/single-spa@^5/lib/system/single-spa.dev.js",
      	"single-spa-layout": "https://unpkg.com/single-spa-layout@1.0.0-beta.5/dist/system/single-spa-layout.min.js",
      	rxjs: rxjs
      };

      const key = 'ImportOverrides';
      async function loadImportOverrides() {
        try {
          return JSON.parse(localStorage[key] || '{}');
        } catch (e) {
          console.error(`failed to load overrides`, e);
        }

        return {};
      }
      async function persistImportOverrides(overrides) {
        localStorage[key] = JSON.stringify(overrides);
      }

      let _bootService;

      function getBootService() {
        return _bootService;
      }
      async function boot(opts) {
        console.info(`Bootstrapping system`);
        const bootService = new BootService(opts);
        _bootService = bootService;
        const modules = bootService.modules;
        modules.resolver = opts.resolver;
        modules.dev = opts.dev;

        if (opts.internals) {
          modules.internals.push(...opts.internals);
        } // preset imports


        Object.assign(modules.imports, imports); // override works

        Object.assign(modules.overrides, await loadImportOverrides());
        console.info(`Injecting system resolve`);
        const System = window['System'];
        const originalResolve = System.constructor.prototype.resolve;

        System.constructor.prototype.resolve = function (id, parentUrl) {
          const resolved = modules.resolve({
            id,
            parentUrl,
            original: (...args) => originalResolve.apply(this, args)
          });
          console.debug(`resolve ${id} to ${resolved} from ${parentUrl}`);
          return resolved;
        };
      }

      var name = "@wener/apis-boot";
      var title = "启动模块";
      var description = "控制映射模块，控制模块版本。";
      var metadata = exports('metadata', {
      	name: name,
      	title: title,
      	description: description
      });

      function getBaseUrl() {
        // allowed override base url
        return localStorage['BASE_URL'] || location.href;
      }
      function resolvePath(v) {
        return new URL(v, getBaseUrl()).href;
      }

    }
  };
});
//# sourceMappingURL=wener-apis-boot.system.js.map
