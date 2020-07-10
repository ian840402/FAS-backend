import Router from 'koa-router'

const router = new Router({
  prefix: '/database'
})

router.get('/syncTable', async (ctx: any) => {
  await ctx.database.sequelize.sync({ force: true })
  console.log('資料表同步完成')
  ctx.body = '資料表同步完成'
})

export default router.routes()
