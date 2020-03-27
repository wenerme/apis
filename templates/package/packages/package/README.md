# Template file for sub package

- src

## dependencies

```bash
# dev
yarn add -D dotenv @types/node

# react
yarn add react@latest react-dom@latest

# support `yarn docs` to generate document
yarn add -D typedoc
```

### storybook

```shell
# support paths
yarn add -D tsconfig-paths-webpack-plugin

# support @storybook/addon-docs
yarn add -D react-docgen-typescript-loader

# storybook
yarn add -D @storybook/{react,addons}
yarn add -D @storybook/addon-{actions,links,docs,viewport,storysource,centered}
```

### jest

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
