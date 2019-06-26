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

### babel-runtime