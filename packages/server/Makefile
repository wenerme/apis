# Keep file
.PRECIOUS: public/modules/wener-apis-%.system.js
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
	yarn rollup -c rollup.mod.ts --watch

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
	NODE_ENV=production MOD_NAME="$(subst $(space),$(comma),${MODULES})" yarn rollup -c rollup.mod.ts

build-%: public/modules/wener-apis-%.system.js
	@echo Done build

public/modules/wener-apis-%.system.js: $$(shell find src/modules/% -type f  -name '*.ts' -o -name '*.tsx')
	MOD_NAME=$* yarn rollup -c rollup.mod.ts

always:

