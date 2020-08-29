.PHONY: es lib build bundle docs clean

SHELL:=/bin/bash

SRC:=$(shell find src -type f  -name '*.ts' -o -name '*.tsx')

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

dev:
	yarn ts-node-dev ./src/server.ts

build-server:
	yarn ncc build ./src/server.ts -o dist/server -s --v8-cache

dist/server/index.js: $(shell find src -type f  -name '*.ts' -o -name '*.tsx')
	yarn ncc build ./src/server.ts -o dist/server -s --v8-cache
server-image: dist/server/index.js
	docker build -t wener/apis-ping-service -f server.Dockerfile .
