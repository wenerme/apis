.PHONY: es lib build bundle docs clean

build: es lib bundle docs

lib:
	yarn tsc --build tsconfig.json .
es:
	yarn tsc --build tsconfig.es.json .
bundle:
	yarn rollup -c rollup.config.ts
docs:
	yarn typedoc --out docs --target es6 --theme minimal --mode file src
clean:
	rm -rf ./lib ./dist ./es ./docs
