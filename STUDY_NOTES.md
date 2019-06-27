## ESLint

### eol-last

> Require or disallow newline at the end of files
> http://eslint.cn/docs/rules/eol-last

### space-before-function-paren

> Require or disallow a space before function parenthesis
> http://eslint.cn/docs/4.0.0/rules/space-before-function-paren

## 移动端开发

### viewport

```html
<!-- 禁用缩放: maximum-scale=1.0, minimum-scale=1.0, user-scalable=no -->
<meta name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no">
```

### FastClick

> [FastClick-GitHub](https://github.com/ftlabs/fastclick)

根据 Google 开发者文档：

> ...mobile browsers will wait approximately 300ms from the time that you tap the button to fire the click event. The reason for this is that the browser is waiting to see if you are actually performing a double tap.

从点击屏幕上的元素到触发元素的 click 事件，移动浏览器会有大约 300 毫秒的等待时间。为什么这么设计呢？ 因为它想看看你是不是要进行双击（double tap）操作。



## Babel

### babel-polyfill

在使用时，polyfill 的导入语句必须在 main.js 中的第一行。

### babel-runtime



## CSS

### & 符号

css里的&符号是代表什么意思呢？

```css
.bordered {
  &.float {
    float: left; 
  }
  .top {
    margin: 5px; 
  }
}
```

等同于：

```css
.bordered.float {
  float: left; 
}
.bordered .top {
  margin: 5px;
}
```

.bordered.float 是串联选择器，作用在同一标签上
.bordered .top 是后代选择器，作用在不同标签上 

## XHR

浏览器控制台 Network 中的 XHR 就是 ajax 请求。

XHR 就是 XMLHttpRequest 对象。也就是ajax功能实现所依赖的对象

## JSONP

> [A simple JSONP implementation](https://github.com/webmodules/jsonp)
>
> [动手实现一个JSONP](https://github.com/huruji/blog/issues/9)

**JSONP**(JSON with Padding)是JSON的一种“使用模式”，可用于解决主流浏览器的跨域数据访问的问题。 

### jsonp的基本原理

> jsonp是服务器与客户端跨源通信的常用方法之一，具有简单易用，浏览器兼容性好等特点。
>
> [原来你是这样的jsonp(原理与具体实现细节)](https://github.com/qianlongo/zepto-analysis/issues/4)

**基本思想**

1. 客户端利用`script`标签可以跨域请求资源的性质，向网页中动态插入`script`标签，来向服务端请求数据。
2. 服务端会解析请求的`url`,至少拿到一个回调函数(比如`callback=myCallback`)参数,之后将数据放入其中返回给客户端。
3. 当然jsonp不同于平常的`ajax`请求,它仅仅支持get类型的方式

### 封装 jsonp

> [A simple JSONP implementation](https://github.com/webmodules/jsonp)
>
> 封装 - Encapsulation

```js
import originJSONP from 'jsonp'

export default function jsonp(url, data, option) {
  url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)

  return new Promise((resolve, reject) => {
    originJSONP(url, option, (err, data) => {
      if (!err) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}

// 拼接 url param
export function param(data) {
  let url = ''
  for (let k in data) {
    let value = data[k] !== undefined ? data[k] : ''
    url += '&' + k + '=' + encodeURIComponent(value)
  }
  return url ? url.substring(1) : ''
}
```

