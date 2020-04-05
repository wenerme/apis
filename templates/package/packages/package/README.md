# Template file for sub package

- src

# dependencies

```bash
# dev
yarn add -D dotenv @types/node typescript

# react for bundle
yarn add react@latest react-dom@latest

# build library
yarn add -P react@latest react-dom@latest

# support `yarn docs` to generate document
yarn add -D typedoc
```

## typescript

* https://github.com/google/gts/blob/master/tsconfig-google.json

```bash
# sync @types dependencies
npx typesync
```

```yarn
yarn add -D typescript ts-node
```

npx typesync

    "@types/cron": "^1.7.1",
    "@types/dotenv": "^6.1.1",
    "@types/koa": "2.0.49",
    "@types/koa-bodyparser": "^4.3.0",
    "@types/koa-helmet": "^3.1.2",
    "@types/koa-jwt": "^3.3.0",
    "@types/koa-router": "^7.0.42",
    "@types/koa__cors": "^2.2.3",
    "@types/node": "^12.0.12",
    "@types/shelljs": "^0.8.0",
    "nodemon": "^1.19.1",
    "shelljs": "^0.8.2",
    "ts-node": "^8.3.0",
    "tslint": "^5.18.0",
    "typescript": "^3.5.2"

## react

- common
  - [hoist-non-react-statics](https://github.com/mridgway/hoist-non-react-statics)
  - react-is

### react state

```bash
# improve equal compare
yarn add react-fast-compare

# subscription for state
yarn add rxjs
```

### react-icons

```bash
# https://react-icons.netlify.com/#/
# antd, bootstrap, devicon, feather, fa, game icons, github, ionicons, md, typicons, weeather icons
yarn add react-icons
# svg 渐变
yarn add react-svg-morph

# base element for react-icons
# https://github.com/gorangajic/react-icon-base
yarn add react-icon-base
```

## redux

```bash
yarn add @redux/toolkit

# work with entity
yarn add normalizr
# or
yarn add redux-orm
```

### styled-components

- jest testing

  - jest-styled-components

```bash
yarn add styled-components
yarn add -D @types/styled-components

# https://polished.js.org/docs/
# helper
yarn add polished

# babel ssr optimize and css support
yarn add -D babel-plugin-styled-components
```

## storybook

```shell
# support paths
yarn add -D tsconfig-paths-webpack-plugin

# support @storybook/addon-docs
yarn add -D react-docgen-typescript-loader

# webpack
yarn add -D babel-loader babel-preset-react-app

# storybook
yarn add -D @storybook/{react,addons}
yarn add -D @storybook/addon-{actions,links,docs,viewport,storysource,centered,knobs}
```

## jest

```bash
# ts-jest
yarn add -D jest ts-jest @types/jest

# test react
yarn add -D react-test-renderer

# test hooks
yarn add -D @testing-library/react-hooks

# test storyboook's story
yarn add -D @storybook/addon-storyshots
```

## server

### koa

```bash
# common
yarn add koa koa-bodyparser koa-helmet koa-jwt koa-router
# support cors
yarn add @koa/cors

# annotation
yarn add koa-swagger-decorator
```


npx typesync

    "@types/cron": "^1.7.1",
    "@types/dotenv": "^6.1.1",
    "@types/koa": "2.0.49",
    "@types/koa-bodyparser": "^4.3.0",
    "@types/koa-helmet": "^3.1.2",
    "@types/koa-jwt": "^3.3.0",
    "@types/koa-router": "^7.0.42",
    "@types/koa__cors": "^2.2.3",
    "@types/node": "^12.0.12",
    "@types/shelljs": "^0.8.0",
    "nodemon": "^1.19.1",
    "shelljs": "^0.8.2",
    "ts-node": "^8.3.0",
    "tslint": "^5.18.0",
    "typescript": "^3.5.2"

### knex

```bash
yarn add 
```

    "@koa/cors": "^3.0.0",
    "class-validator": "^0.9.1",
    "cron": "^1.7.2",
    "dotenv": "^8.0.0",

    "pg": "^7.4.3",
    "pg-connection-string": "^2.0.0",
    "reflect-metadata": "^0.1.12",
    "typeorm": "^0.2.18",
    "winston": "^3.2.1"
