const fs = require('fs');
const path= require('path');
const { Regex } = require('./enums');
const { is, isArray, isFunction, isString } =require('./utils/is'); 
const vitePluginHtmlInfoInject = (options) => {
  const { title, script, css,keywords,description,vconsole } = options;
  let env;
  return {
    name:'vite-plugin-html-info-inject',
    config(_, { command }) {
      env = command;
    },
    transformIndexHtml(html) {
      let result = '';
      if (title) {
        result= html.replace(Regex.title,`<title>${isFunction(title)?title():title}</title>`)
      }
      if (description && keywords) {
        result = result.replace(Regex.endTitle, `</title>\n<meta name="keywords"  content="${keywords}">\n<meta name="description"  content="${description}">`);
      } else if (keywords) {
        result = result.replace(Regex.endTitle, `</title>\n<meta name="keywords"  content="${keywords}">`);
      } else if (description) {
        result = result.replace(Regex.endTitle, `</title>\n<meta name="description"  content="${description}">`);
      }
      if (css&& isArray(css)) {
        css.forEach(item => {
          result = result.replace(Regex.endHead, `<link href="${item.src}" />\n</head>`);
        } )
      } else if (isString(css)) {
        result = result.replace(Regex.endHead, `<link href="${css}" />\n</head>`);
      }
      if (script&& isArray(script)) {
        script.forEach(item => {
          result = item.pre ?
            result.replace(Regex.endHead, `<script src="${item.src}"></script>\n</head>`)
            : result.replace(Regex.endHtml, `<script src="${item.src}"></script>\n</html>`);
        })
      } else if (isString(script)) {
        result= result.replace(Regex.endHtml, `<script src="${script}"></script>\n</html>`)
      }
      if (vconsole&&env=='serve') {
        const content = fs.readFileSync(path.resolve(path.resolve(__dirname,'./utils/vconsole.js')));
        result = result.replace(Regex.endHtml, `<script>${Buffer.from(content).toString('utf-8')}</script>\n</html>`);
      }
      return result;
    }
  }
};
module.exports = vitePluginHtmlInfoInject;
