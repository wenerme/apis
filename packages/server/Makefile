# Keep file
.PRECIOUS: public/modules/wener-apis-%.system.js

mod-dev:
	MOD_NAME=boot,root,test,dash,geo,client,phone yarn rollup -c rollup.mod.ts --watch

build-%: public/modules/wener-apis-%.system.js
	@echo Done build

public/modules/wener-apis-%.system.js: always
	MOD_NAME=$* yarn rollup -c rollup.mod.ts

always:

.PHONEY: always
