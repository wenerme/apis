# Keep file
.PRECIOUS: public/modules/wener-apis-%.system.js

build-%: public/modules/wener-apis-%.system.js
	@echo Done build

public/modules/wener-apis-%.system.js: $(wildcard src/modules/%)
	MOD_NAME=$* yarn rollup -c rollup.mod.ts
