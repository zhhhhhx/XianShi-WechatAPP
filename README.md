# XianShi-WechatAPP

## 运行方式：

用微信开发者工具打开运行

## 文件构成：

<details>

   <summary>展开查看文件构成</summary>

1. **components 组件** 

   存放公共组件供其他页面使用
  
2. **functions 云函数** 
  
   存放使用的云函数 目前只用到了获取用户openid的云函数
  
3. **icon 图标** 
  
   存放下方导航栏等组件会使用到的各种图标 
   
4. **lib 库**
   
   系统默认创建的文件 目前为空 可以先忽视
   
5. **pages 页**
  
   小程序主要页面都放在pages中 每个页面由4个文件构成：（某些页面还有less文件，等同于wxss）
   - js 存放了页面数据和逻辑函数，可以看作是类；
   - json 系统配置文件，大部分为默认配置；
   - wxml 标签文件 在页面上显示文本，按钮等标签
   - wxss 样式文件 修改各标签的颜色，大小等样式
   
6. **styles 通用样式文件**
  
   目前作用不大 可以忽视
   
7. **utils**
    
   系统默认文件 可以忽视
    
8. **app**
   
   - app.js 全局js文件 可以忽视
   - app.json 全局配置文件 放了各个页面地址 和一些系统配置
   - app.wxss 全局样式文件 定义了一些全局通用的样式
   
9. **project.config.json 和 sitemap.json**
   
   都是系统默认创建的文件 可以忽视
   
</details>
   
## GitHub 使用流程:new:

<details>

   <summary>展开查看使用流程</summary>

1. 将组织的[源仓库](https://github.com/XianShi-APP/XianShi-WechatAPP)『fork』到个人的仓库中去（位置在页面右上角）
2. 编码等等操作后，更新个人仓库（**请所有操作下面有『Commit changes』的都简单说明一下工作的内容和位置，下略**）
3. 在个人仓库那里提交『Pull Requests』到组织的[源仓库](https://github.com/XianShi-APP/XianShi-WechatAPP)中的一个新『Branch』里面去（**branch注意命名规范，见PPT。这个Branch要自己先去源仓库创建**）
4. 钟卓江负责同意『Pull Requests』的合并，维护仓库的稳定（如果不是pull到一个新branch是不应该同意merge的），同时了解工作情况和控制项目进度
5. 测试人员（目前暂定为钟卓江）简单测试后将对应的『Branch』合并到的 develop branch 中
6. 系统集成测试完成后将 develop branch 合并到 main branch 中，创建tag保存版本代码，main branch 和对应的 tag 是我们演示和可交付的稳定版本

</details>
