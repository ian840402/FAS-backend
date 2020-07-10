import koa from 'koa'
import koaLogger from 'koa-logger'
import koaBodyParser from 'koa-bodyparser'
import koaCORS from '@koa/cors'
import database from './database'
import middleware from './middleware'
import router from './routers/router'

const app = new koa()
const port = process.env.PORT || 27001

app.use(koaLogger())
app.use(koaCORS())
app.use(koaBodyParser())
app.use(database)
app.use(middleware)
app.use(router.routes())
app.use(router.allowedMethods())

app.listen(port, async() => {
  console.log(`The server is opening on ${port}`)
})