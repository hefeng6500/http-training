const Koa = require('koa');
const Router = require('@koa/router')
const session = require('koa-session')
const uuid = require('uuid')


const app = new Koa()

let router = new Router()
app.keys = ['test']

// router.get('/visit', async (ctx, next) => {
//   let visit = ctx.cookies.get('visit') || 0
//   visit++;
//   ctx.cookies.set('visit', `${visit}`, { httpOnly: true, signed: true })
//   ctx.body = `第 ${visit} 次访问cookie`
// })

app.use(session({}, app))

router.get('/visit', async (ctx, next) => {
  debugger
  ctx.session.visit || 0
  ctx.session.visit++;
  ctx.body = `第 ${ctx.session.visit} 次访问cookie`
})



app.use(router.routes());

app.listen(3000);