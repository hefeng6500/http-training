# http-header 之关于 cookie 的学习

1、使用 nodejs 创建一个 node server
```
http.createServer((req, res) => {
  // 发送 HTTP 头部 
  // HTTP 状态值: 200 : OK
  // 内容类型: text/plain
  response.writeHead(200, {'Content-Type': 'text/plain'});

  // 发送响应数据 "Hello World"
  response.end('Hello World\n');
}).listen(3000);

// 终端打印如下信息
console.log('Server running at http://127.0.0.1:3000/');
```

2、创建路由服务器设置 cookie

```
if (req.url === "/write") {
  res.setHeader('Set-Cookie', [`name=hefeng;`, 'age=11; httpOnly=true'])
  res.end('Write Cookie!')
}
```

3、配置 hosts 文件，通过域名访问本地 node 服务器
hosts 文件地址： C:\Windows\System32\drivers\etc 若无法修改清修改文件读取权限；

```
127.0.0.1           hefeng.com
```

4、设置 cookie 的访问域
```
res.setHeader('Set-Cookie', ['name=hefeng; domain=cookie.hefeng.com', 'age=11'])
```

浏览器打开 hefeng.com 会发现：
- hefeng.com 域名下 cookie： ['age=11']。 
- cookie.hefeng.com 域名下 cookie： ['name=hefeng','age=11']

不限定 domain cookie都会被设置；
限定则只在对于子域名下显示

5、cookie 中控制字段属性
- expires: 绝对时间
设置 3s 后到期
  ```
   res.setHeader('Set-Cookie', [`name=hefeng; expires=${new Date(Date.now() + 3*1000).toGMTString()}`, 'age=11'])
  ```
- max-age： 相对时间, 设置 3s 后到期
  ```
  res.setHeader('Set-Cookie', [`name=hefeng; max-age=3`, 'age=11'])
  ```
- httpOnly： true | false, 浏览器不可以操作 cookie， document.cookie 无法读取或者修改 httpOnly=true 的 cookie。但是用户打开 F12 可以操作 Application 的 cookie 值。

jwt学习
```
const Koa = require('koa');
const Router = require('@koa/router')
const bodyparser = require('koa-bodyparser')
const jwt = require('jwt-simple')

const app = new Koa()
let router = new Router()

app.use(bodyparser())

let secret = 'test'
router.post('/login', async (ctx) => {
  let { username, password } = ctx.request.body;
  if (username === 'admin' && password === 'admin') {
    let token = jwt.encode(username, secret);
    ctx.body = {
      code: 200,
      username,
      token,
    }
  }
});

app.use(router.routes());

app.listen(3000);
```