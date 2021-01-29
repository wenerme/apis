.PHONY: build bundle docs clean

SHELL:=/bin/bash

SVGS:=$(wildcard src/icons/svgs/*.svg)
SVGRS=$(SVGS:src/icons/svgs/%.svg=src/icons/svgr/%.tsx)
AntdIcons=$(SVGRS:src/icons/svgr/%.tsx=src/icons/components/%.tsx)

build: es lib bundle docs

lib: tsconfig.build.json
	npx tsc --build tsconfig.build.json .
es: tsconfig.es.json
	npx tsc --build tsconfig.es.json .
bundle:
	npx rollup -c rollup.config.ts
docs:
	# npx typedoc --out docs --target es6 --theme minimal --mode file src
storybook:
	npx build-storybook -c .storybook -o storybook --quiet

clean:
	rm -rf ./lib ./dist ./es ./docs ./storybook

prepare:
	npm add -D rollup @babel/core @rollup/plugin-babel rollup-plugin-terser @rollup/plugin-node-resolve
	npm add -D typescript tslib @rollup/plugin-typescript

icons: $(AntdIcons)
	git add src/icons
$(AntdIcons): $(SVGRS) scripts/icons.ts
	TS_NODE_PROJECT=tsconfig.ts-node.json yarn node -r ts-node/register ./scripts/icons.ts
$(SVGRS): $(SVGS)
	npx svgr -d ./src/icons/svgr/ ./src/icons/svgs/ --typescript --icon
$(SVGS):
	npx svgo -f src/icons/svgs --config svgo.config.json

server-modules:
	cp -v dist/wener-ui{,-antds,-icons,-wener}.system{,.min}.js{,.map} ../server/public/modules/
