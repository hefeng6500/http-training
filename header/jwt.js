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