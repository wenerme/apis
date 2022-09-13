ModulePrefix:=wener-apis
# Keep file
.PRECIOUS: public/modules/$(ModulePrefix)-%.system.js
# eval $$
.SECONDEXPANSION:
.PHONEY: always

SHELL:=/bin/bash

# all modules
# ls src/modules/*/index.ts | egrep -o '[^/]*/index' | egrep -o '^[^/]*'
# ls src/modules/*/index.ts | egrep -o '[^/]*/index' | egrep -o '^[^/]*' | paste -sd ',' -
MODULES:=$(shell ls src/modules/*/index.ts | egrep -o '[^/]*/index' | egrep -o '^[^/]*' | paste -sd ' ' -)

empty:=
space:= $(empty) $(empty)
comma:= ,

mod-dev:
	pnpm exec rollup -c rollup.mod.ts --watch

# pre build
make-%: always
	-$(MAKE) -f src/modules/$*/Makefile build
## 如果文件存在才执行
#ifneq (,$(wildcard src/modules/$*/Makefile))
#	$(MAKE) -f src/modules/$*/Makefile build
#else
#	@echo Skip - no makefile $(wildcard src/modules/$*/Makefile)
#endif

modules-pre: $(addprefix make-,$(MODULES))

modules: modules-pre
	@echo Building all modules $(MODULES)
	NODE_ENV=production MOD_NAME="$(subst $(space),$(comma),${MODULES})" pnpm exec rollup -c rollup.mod.ts

build-%: public/modules/$(ModulePrefix)-%.system.js
	@echo Done build

public/modules/$(ModulePrefix)-%.system.js: $$(shell find src/modules/% -type f  -name '*.ts' -o -name '*.tsx')
	MOD_NAME=$* pnpm exec rollup -c rollup.mod.ts

clean-%:
	rm -rfv public/modules/$(ModulePrefix)-$**
clean:
	rm -rfv public/modules/$(ModulePrefix)*

always:

calc:
	npx esbuild src/apps/calc/index.ts --outfile=out/apps/calc.js --bundle --minify --sourcemap --target=chrome80 --define:process.env.NODE_ENV=\"production\" --external:react
# --target=chrome58,firefox57,safari11,edge16

postinstall:
	npm link ../ui

build: always
	npx next build
# tsc --project tsconfig.server.json && yarn run gen && next build

now-build:
	npm run build
	npm run set-platform NOW

dev:
	npm run dev

lint:
	npx eslint src --ext .ts,.tsx
fmt:
	npx prettier -w src --loglevel warn
fix:
	npx prettier -w src --loglevel warn
	npx eslint src --fix --ext .ts,.tsx
