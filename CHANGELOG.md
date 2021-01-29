## TODO
- [ ] p3 kong return null for array config - select widget not handle correctly
- [ ] p4 选择 cert 的 时候 有 tag 更方便
- [ ] p5 select tag 模式不能编辑内容
- [ ] p5 kong 插件类型支持不完善
  - [ ] map
  - [ ] set
  - [ ] non string array
- [ ] p3 storybook bundle 过大 - 28MB
- [ ] p1 项目重构
  - [ ] 前后端拆分
  - [ ] 微前端结构
- [ ] P2 废弃 Antd
  - 全部重写工作量有点大
  - 为什么不用 antd ？
    - 严重封装 - 不按照规定的方式使用阻力非常大
    - 混合了样式和组件逻辑 - 不能单独使用样式
    - table、form 组件设计不合理 - 没有 react-table 和 react-hook-form 好
    - 样式使用上比不上 blueprint - 样式可单独使用
    - 如果组件难用，又无法独立使用样式 - 那么 antd 就失去了价值
- [ ] p1 项目重构/脚本调整为 makefile
- [ ] p2 减少 First Load JS

## 20210129
- [x] P1 NPM - 因为 Vercel 依然不支持 YARN - 使用 YARN 变得无意义

## 20201227
- Move out utils, reaction, rjsf
- [x] p3 gitlab ci 发布 npm - 该 REPO 不需要发布
- [x] p3 github action 发布 npm - 该 REPO 不需要发布
- [x] rjsf-antd-theme - move out
  - [ ] `"ui:enumDisabled": ['two']` 不能禁用 radio
  - [ ] errorSchema 行为不一致
  - [ ] 数组枚举渲染为 select，但没有 title - 因为 root/array
  - [ ] AltDateWidget 格式不一致 - 没有自定义 - 但不需要
- [x] p2 server 迁移使用 @wener/ui 的表单
  - 不再使用 antd 表单

## 20200625
- [x] yarn2

## 20200513

- rjsf-antd-theme
  - [x] antd 主题发布到包或提交 pr

## 20200415

- [x] p4 为 antd 图标生成名字引用
- [x] p2 server's theme not fully working

## 20200406

- [x] p2 迁移 icons 到 @wener/ui
- [x] p3 icons 生成 manfiest
- [x] p2 server 迁移使用 @wener/ui 的 LayoutFrame

## 20200405

- [x] p2 @wener/ui build correctly
- [x] p1 @wener/utils build correctly
