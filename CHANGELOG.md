## TODO
- [ ] p3 kong return null for array config - select widget not handle correctly
- [ ] p4 选择 cert 的 时候 有 tag 更方便
- [ ] p5 select tag 模式不能编辑内容
- [ ] p2 server 迁移使用 @wener/ui 的表单
- [ ] p5 kong 插件类型支持不完善
  - [ ] map
  - [ ] set
  - [ ] non string array
- [ ] rjsf-antd-theme
  - [ ] `"ui:enumDisabled": ['two']` 不能禁用 radio
  - [ ] errorSchema 行为不一致
  - [ ] 数组枚举渲染为 select，但没有 title - 因为 root/array
  - [ ] AltDateWidget 格式不一致 - 没有自定义 - 但不需要
- [ ] p3 storybook bundle 过大 - 28MB
- [ ] p3 gitlab ci 发布 npm
- [ ] p3 guthub action 发布 npm
- [ ] p1 项目重构
  - 现在问题
    - 构建非常慢
    - 单个项目过大，依赖内容过多
    - 前端很多内容是无关的，但是还是需要一起编译更新
  - [ ] 前后端拆分
  - [ ] 微前端结构

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