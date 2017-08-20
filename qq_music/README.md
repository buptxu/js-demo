#qq音乐Vue SPA qq_music

>  本demo参考`https://y.qq.com`开发的

## Build Setup

``` bash
# 安装依赖
npm install

# serve with hot reload at localhost:8080 启动服务
npm run dev （会自动启动浏览器运行项目）

# build for production with minification
npm run build （对这里已经优化了配置文件使 build 生成的文件可以在本地查看，或作为静态页面线上预览）

# build for production and view the bundle analyzer report
npm run build --report

```
## 功能实现

首页：banner滚动效果实现，电台下级页面未接入（配的活动页或列表页，情况太复杂没有固定的借口）

排行榜：完成榜单列表和榜单歌曲list，并可播放榜单歌曲，榜单页播放按钮可播放当前专辑第一首歌曲

搜索页：搜索功能完成，并完成歌手的个人页面，添加搜索框回车提交；热词点击即触发搜索

播放页：歌曲正常播放，歌词同步高亮／滚动；播单显示正常；未做播放控制／收藏功能，播发完自动切换到停止状态

搜索结果页：搜索结果正常显示／跳转到对应播放页面

搜索历史去重／排序

自定义 `localstorage` 方法，添加／删除／清空数据；

优化 `localstorage` 可存／取数组类型（通过序列化和反序列化）


## 优点

用到了比较新且全面的 `Vue` 相关的技术栈，

1. vue
2. vue-awesome-swiper
3. vue-resource
4. vue-router
5. vuex







