# Wener's APIs

## 概述
* [@wener/apis-server](https://apis.wener.me)
  * 通过 now 部署的服务
  * 主要用于验证一些实验性质的想法和实现一些常用接口
  * 前端 react、antd、redux
  * 后端 nextjs、typeorm、pg
  * 特性
    * [WebTorrent Web 客户端](https://apis.wener.me/webtorrent/client)
    * [Kong 网关管理界面](https://apis.wener.me/kong/admin)
    * [摘要哈希计算](https://apis.wener.me/hash/digest)
    * [二维码生成和解析](https://apis.wener.me/barcode/qrcode/builder)
    * [条形码生成和解析](https://apis.wener.me/barcode/linear/builder)
    * [电话归属地查询](https://apis.wener.me/phone/attribution)
* [@wener/utils](https://www.npmjs.com/package/@wener/utils) / [文档](https://apis.wener.me/docs/@wener/utils/index.html)
  * 常用的工具函数
  * 外部一些实用工具迁移为 ts，统一打包减少依赖 
* [@wener/tinyrpc](https://www.npmjs.com/package/@wener/tinyrpc) / [文档](https://apis.wener.me/docs/@wener/tinyrpc/index.html)
  * 基于 ES6 代理的简洁的 RPC 实现

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

## SCEL

```bash
# update index file
sqlite3 sougou-dict-cache.sqlite -Ax scel/index.full.json
ipfs files write -etp /scel/index.full.json scel/index.full.json
# get new hash
ipfs files stat /scel
```


# Links

* Site
  * [wener.me](https://wener.me)
    * Github [wenerme/wener](https://github.com/wenerme/wener)
  * [apis.wener.me](https://apis.wener.me/)
    * Github [wenerme/apis](https://github.com/wenerme/apis)
* Library
  * [@wener/utils](https://www.npmjs.com/package/@wener/utils) - ![VERSION](https://img.shields.io/npm/v/@wener/utils) - ![LICENSE](https://img.shields.io/npm/l/@wener/utils)
    * [Document](https://apis.wener.me/docs/@wener/utils/)
  * [@wener/ui](https://www.npmjs.com/package/@wener/ui) - ![VERSION](https://img.shields.io/npm/v/@wener/ui) - ![LICENSE](https://img.shields.io/npm/l/@wener/ui)
    * [Storybook](https://apis.wener.me/storybook/)
    * [Document](https://apis.wener.me/docs/@wener/ui/)
  * [@wener/tinyrpc](https://www.npmjs.com/package/@wener/tinyrpc) - ![VERSION](https://img.shields.io/npm/v/@wener/tinyrpc) - ![LICENSE](https://img.shields.io/npm/l/@wener/tinyrpc)
    * [Document](https://apis.wener.me/docs/@wener/tinyrpc/)
