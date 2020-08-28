import Router from 'koa-router'

const router = new Router({
  prefix: '/record_types'
})

/**
 * method: GET
 * description: get all record_type
 * 
 * params: order_by, order_key, is_income
 */
router.get('/', async (ctx: any) => {
  const orderRule: string = ctx.request.query.order_by || 'ASC'
  const orderKey: string = ctx.request.query.order_key || 'id'
  const isIncome: boolean = ctx.request.query.is_income === 'true'
  const { rows: data, count: total } = await ctx.database.record_type.findAndCountAll({
    where: {
      is_income: isIncome
    },
    order: [
      [orderKey, orderRule]
    ]
  })
  ctx.body = {
    total,
    data
  }
})

/**
 * method: GET
 * description: get a single record_type
 */
router.get('/:id', async (ctx: any) => {
  const id: number = Number(ctx.params.id)
  ctx.assert(!isNaN(id), 400, 'The request is invalid！')
  const data = await ctx.database.record_type.findByPk(id)
  ctx.assert(data, 404, 'The data is not found！')
  ctx.body = data
})

/**
 * method: POST
 * description: create new record_type
 */
router.post('/', async (ctx: any) => {
  const { name, is_income, description } = ctx.request.body
  ctx.assert(name, 400, 'Some field is empty！')
  await ctx.database.record_type.create({ name, is_income, description })
  ctx.status = 201
  ctx.body = { msg: 'The data is created！' }
})

/**
 * method: PUT
 * description: update a single record_type
 */
router.put('/:id', async (ctx: any) => {
  const id: number = Number(ctx.params.id)
  ctx.assert(!isNaN(id), 400, 'The request is invalid！')
  const data = await ctx.database.record_type.findByPk(id)
  ctx.assert(data, 404, 'The data is not found！')
  const { name, is_income, description } = ctx.request.body
  ctx.assert(name, 400, 'Some field is empty！')
  await ctx.database.record_type.update(
    { name, is_income, description },
    { where: { id }}
  )
  ctx.body = { msg: 'The data is updated！' }
})

/**
 * method: DELETE
 * description: delete a single record_type
 */
router.delete('/:id', async (ctx: any) => {
  const id: number = Number(ctx.params.id)
  ctx.assert(!isNaN(id), 400, 'The request is invalid！')
  const data = await ctx.database.record_type.findByPk(id)
  ctx.assert(data, 404, 'The data is not found！')
  await ctx.database.record_type.destroy({ where: { id }})
  ctx.status = 204
})

export default router.routes()
