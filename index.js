import { Regex } from "./enums";
import {is, isArray, isFunction, isString} from './utils/is'
export const htmlPlugin = (options) => {
  const { title, script, css,keywords,description } = options;
  
  return {
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
      return result;
    }
  }
};
