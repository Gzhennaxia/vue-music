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



浏览器的刷新一般是 17ms 一次。 



## 后端接口代理

> [Vue编写代理请求的方法改进](http://asing1elife.com/vue/webpack/2017/11/23/Vue编写代理请求的方法改进/)

vue升级到**2.9.1**后，通过其vue-cli构建的webpack项目目录结构发生以下变化：

**发生的变化**

1. 在2.9.1之前，通过vue-cli构建的项目build目录如下，如图
  ![](http://asing1elife.com/sources/images/FD738C66-A0DB-4492-959D-EB22CC7F23C4.png)

2. 在2.9.1之后，通过vue-cli构建的项目build目录如下，如图

   ![](http://asing1elife.com/sources/images/AD33A96F-6270-409A-94BB-C83EE75FE58D.png)

3. 通过以上两张图可以明确看出新版本构建出的项目缺少了**dev-client.js**和**dev-server.js**文件 

**造成的问题**

1. 缺少**dev-server.js**文件之后，所带来的问题是之前我们在需要编写**代理请求**时会在该文件中自定义如下路由信息，而现在应该将这些路由信息存放在哪呢？

```js
var apiRoutes = express.Router()

apiRoutes.get('/getDiscList', function (req, res) {
  var url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'
  axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com/',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then((response) => {
    res.json(response.data)
  }).catch((e) => {
    console.log(e)
  })
})

app.use('/api', apiRoutes)
```

**解决的方式**

1. 其实在新版本中关于服务器的配置信息都被存放在**webpack.dev.conf.js**文件中，所以对于用来发送**代理请求**的自定义路由信息自然也应该存放到该文件中
2. 只是存放的方式稍有变化，在新版本中服务器通过**webpack-dev-server**进行管理，所以需要在该server启动之前将代理请求接口映射完毕
3. webpack3内置了express() ，以下代码中的app就是express返回的对象

```js
devServer: {
  ...
  // 在服务器开启之前，将需要被代理的请求与本地接口进行一一对应
  before (app) {
    // 由于QQ音乐获取歌单列表的接口做了header信息的验证，所以需要通过代理的方式去模拟其规则范围的header，使用其允许的header发起请求
    app.get('/api/getDiscList', function (req, res) {
      // 真实的QQ音乐获取歌单列表的请求
      const url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'

      // 通过axios发送异步请求
      axios.get(url, {
        // 在发送请求时修改头文件，模拟合法的头文件，去欺骗服务器获取请求数据
        headers: {
          referer: 'https://c.y.qq.com/',
          host: 'c.y.qq.com'
        },
        // 获取参数列表
        // 由于浏览器请求参数是穿透传播的，所以当前端请求getDiscList时，传递的参数在次数可以直接获取到
        params: req.query
      }).then((response) => {
        // res是本地方法接收本地请求的返回值
        // response是访问服务器接口的返回值
        // 此处只需要将从服务器获取的返回值通过json的方式传递给本地请求的返回值，即实现了一次代理转发
        res.json(response.data)
      }).catch((e) => {
        // 捕获错误信息并输出
        console.error(e)
      })
    })
  }
}
```

## 字符转移

v-html 指令



## Better-scroll

> [better-scroll滚动排坑](https://juejin.im/post/5a79230ef265da4e896ab029)

- better-scroll 只处理容器（wrapper）的第一个子元素（content）的滚动，其它的元素都会被忽略。
- 父级div要设置溢出隐藏，并且固定高度



设置标志位，使得只执行一次

```js
loadImage() {
  if (!this.checkloaded) {
    this.checkloaded = true
    this.$refs.scroll.refresh()
  }
}
```



Better-scroll 滚动的思路就是根据父元素和子元素的高度的差计算出可以滚动的位置。所以需要在元素高度改变（DOM 变化）的时候刷新 scroll 实例，否则会导致不能滚动、滚动不到底部等这些问题。



## 图片懒加载

> [Vue-Lazyload](https://github.com/hilongjw/vue-lazyload)



## Fastclick 与 better-croll 的 click 冲突

添加 `class="needsclick"` 



## transform: translateY(-50%) 实现元素垂直居中效果

translate 属性值的单位如果为 %，则其相对的是元素本身的高度。

```css
.loading-container
  position: absolute
  width: 100%
  top: 50%
  transform: translateY(-50%)
```

