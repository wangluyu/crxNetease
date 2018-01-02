# extension

> A media extension for chromeextension

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## 下载网易云音乐
### 功能需求
- √ 将听过的歌保存下来，用表格形式展示
- √ 下载歌曲
- √ 添加遮罩
- 生成链接错误提醒
- √ 列表分页
```
以下三条有bug，删除后 分页没变
- √ 清空列表
- √ 清空本页
- √ 删除某一首
```
- 另起一个页面 显示当前播放的歌曲 控制前一首/后一首/开始/暂停/like

### 命名规则
- 网站名-（组件-）描述 
    - 例：netease_table_total_page 网易-table组件-总页数
