import Router from 'koa-router'

const router = new Router({
  prefix: '/info'
})

router.get('/', async (ctx: any) => {
  ctx.body = ''
})

export default router.routes()
