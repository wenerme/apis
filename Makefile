.SECONDEXPANSION:

SHELL:=/bin/bash

love:
	@exit Run which task ?

ui: utils
	yarn run --cwd packages/$@ tsc --noEmit
	yarn run --cwd packages/$@ build

utils:
	yarn run --cwd packages/$@ tsc --noEmit
	yarn run --cwd packages/$@ build

tinyrpc:
	yarn run --cwd packages/$@ tsc --noEmit
	yarn run --cwd packages/$@ build

server: ui utils
	# type check first - find problem early
	yarn run --cwd packages/server tsc --noEmit
	yarn run --cwd packages/server next build
	make -C packages/server modules

ci:
	yarn install
	# server is too hard to build - build static first
	make -C packages/ui lib bundle server-modules
	make -C packages/utils lib bundle server-modules
	make -C packages/server modules
	cp -r packages/server/public .

publish: ui utils tinyrpc
	yarn lerna publish prerelease --registry https://registry.npmjs.org/  --no-push
