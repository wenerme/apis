.SECONDEXPANSION:


love:
	@exit Run which task ?

ui: packages/utils/lib/index.js
	yarn run --cwd packages/$@ tsc --noEmit
	yarn run --cwd packages/$@ build

packages/%/lib/index.js: $$(shell find packages/%/src -type f -name '*.ts')
	yarn run --cwd packages/$* tsc --noEmit
	yarn run --cwd packages/$* build
#utils: $$(shell find packages/utils/src -type f -name '*.ts')
#	yarn run --cwd packages/$@ tsc --noEmit
#	yarn run --cwd packages/$@ build

server: ui
	# type check first - find problem early
	yarn run --cwd packages/server tsc --noEmit
	yarn run --cwd packages/server next build
	make -C packages/server modules

ci: server
