# Wener's APIs

## 开发
* 使用 Node 12 LTS 版本

```bash
# 如果使用 nvm
nvm install 12
nvm use 12
```

## Bundle

```bash
# ncc 构建单文件
ncc build scripts/setup-db.ts
# 执行
node dist/index.js

# pkg 打包 next 应用
yarn build
pkg -t node12-macos-x64 . --out-dir dist

# 执行服务端生成脚本
TS_NODE_PROJECT=$PWD/tsconfig.ts-node.json node -r ts-node/register -r tsconfig-paths/register server/prebuild.ts 
```
