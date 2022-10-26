## vite-plugin-html-info-inject
---
vite 插件，可配置化的添加html的页面，title、keywords、description,注入js、css
可在开发环境开启调试工具vconsole调试台
 

> example

```js
import vitePluginHtmlInfoInject from 'vite-plugin-html-info-inject'
export default defineConfig({
  plugins: [
    // ...
    vitePluginHtmlInfoInject({
      title:"你好，我是title",                             //标题
      script:[{src:"https://baidu.ccom",pre:true}],      //外链js
      css:[{src:"https://ss.cc"},{src:"https://ss.cc"}], //外链的css配置
      keywords:'我是关键字',                               //meta  关键字
      description:'我是描述',                              //meta 描述
      vconsole: true                                      //是否开启调试台  开发模式
  })
  ]
})


```

> 说明
- `pre`代表script的位置，pre为`true`时，将插入到head中，默认html标签后
- script和css为单个的话，可以通过字符串的形式直接配置 
- vconsole 调试控制台，`true`时会在开发环境显示调试台

