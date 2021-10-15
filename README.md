# XianShi-WechatAPP
运行方式：用微信开发者工具打开运行
文件构成：
  1.components 组件 
    存放公共组件供其他页面使用
  2.functions 云函数 
    存放使用的云函数 目前只用到了获取用户openid的云函数 
  3.icon 图标 
    存放下方导航栏等组件会使用到的各种图标 
  4.lib 库
    系统默认创建的文件 目前为空 可以先忽视
  5.pages 页
    小程序主要页面都放在pages中 每个页面由4个文件构成：（某些页面还有less文件，等同于wxss）
    js 存放了页面数据和逻辑函数，可以看作是类；
    json 系统配置文件，大部分为默认配置；
    wxml 标签文件 在页面上显示文本，按钮等标签
    wxss 样式文件 修改各标签的颜色，大小等样式
  6.styles 通用样式文件
    目前作用不大 可以忽视
  7.utils
    系统默认文件 可以忽视
  8.app 
    app.js 全局js文件 可以忽视
    app.json 全局配置文件 放了各个页面地址 和一些系统配置
    app.wxss 全局样式文件 定义了一些全局通用的样式
  9. project.config.json 和 sitemap.json
    都是系统默认创建的文件 可以忽视
目前已知问题
  1.发布委托页面上传图片路径无效
  2.发布委托价格合法性检测无效
  3.在某些操作后页面不能自动刷新 如删除自己发布的委托后，被删除的委托依然显示在页面需要手动刷新
