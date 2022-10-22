## vite-plugin-info-inject
---
vite 插件，可配置化的添加html的页面，title、keywords、description,注入js、css

> example

```js
import vitePluginInfoInject from 'vitePluginInfoInject'
export default defineConfig({
  plugins: [
    // ...
    vitePluginInfoInject({
      title:"你好，我是title",
      script:[{src:"https://baidu.ccom",pre:true}],
      css:[{src:"https://ss.cc"},{src:"https://ss.cc"}],
      keywords:'好久不见 ',description:'好久不见'
  })
  ]
})


```

> 说明
- pre
代表script的位置，pre为true时，将插入到head中，默认html标签后
- script和css为单个的话，可以通过字符串的形式直接配置

