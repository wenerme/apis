# Keep file
.PRECIOUS: public/modules/wener-apis-%.system.js

mod-dev:
	MOD_NAME=boot,root,test,dash,geo,client yarn rollup -c rollup.mod.ts --watch

build-%: public/modules/wener-apis-%.system.js
	@echo Done build

public/modules/wener-apis-%.system.js: $(wildcard src/modules/%)
	MOD_NAME=$* yarn rollup -c rollup.mod.ts
