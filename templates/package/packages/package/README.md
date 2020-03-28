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
yarn add -D @storybook/addon-{actions,links,docs,viewport,storysource,centered}
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
