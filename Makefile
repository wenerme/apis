.SECONDEXPANSION:


love:
	@exit Run which task ?

ui: utils
	yarn run --cwd packages/$@ tsc --noEmit
	yarn run --cwd packages/$@ build

utils:
	yarn run --cwd packages/$@ tsc --noEmit
	yarn run --cwd packages/$@ build

server: ui utils
	# type check first - find problem early
	yarn run --cwd packages/server tsc --noEmit
	yarn run --cwd packages/server next build
	make -C packages/server modules

ci:
	yarn install
	$(MAKE) server
