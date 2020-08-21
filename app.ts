import koa from 'koa'
import koaLogger from 'koa-logger'
import koaBodyParser from 'koa-bodyparser'
import koaCORS from '@koa/cors'
import color from 'colors'
import database from './database'
import authentication from './middleware/authentication'
import router from './routers/router'

const app = new koa()
const port = process.env.PORT || 27001

app.use(koaLogger())
app.use(koaCORS())
app.use(koaBodyParser())
app.use(database)
app.use(authentication)
app.use(router.routes())
app.use(router.allowedMethods())

app.listen(port, async() => {
  console.log(color.green(`The server is opening on ${port}`))
})