import Router from 'koa-router'

const router = new Router({
  prefix: '/income_types'
})

/**
 * method: GET
 * description: get all income_type
 */
router.get('/', async (ctx: any) => {
  const pageSize: number = Number(ctx.request.query.page_size) || 10
  const currentPage: number = Number(ctx.request.query.page) || 1
  const orderRule: string = ctx.request.query.order_by || 'ASC'
  const orderKey: string = ctx.request.query.order_key || 'id'
  const startPage: number = pageSize * (currentPage - 1);
  const { rows: data, count: total } = await ctx.database.income_type.findAndCountAll({
    offset: startPage,
    limit: pageSize,
    order: [
      [orderKey, orderRule]
    ]
  })
  ctx.body = {
    total,
    data,
    page_size: pageSize,
    current_page: currentPage,
    last_page: Math.ceil(total / pageSize)
  }
})

/**
 * method: GET
 * description: get a single income_type
 */
router.get('/:id', async (ctx: any) => {
  const id: number = Number(ctx.params.id)
  ctx.assert(!isNaN(id), 400, 'The request is invalid！')
  const data = await ctx.database.income_type.findByPk(id)
  ctx.assert(data, 404, 'The data is not found！')
  ctx.body = data
})

/**
 * method: POST
 * description: create new income_type
 */
router.post('/', async (ctx: any) => {
  const { name, description } = ctx.request.body
  ctx.assert(name, 400, 'Some field is empty！')
  await ctx.database.income_type.create({ name, description })
  ctx.status = 201
  ctx.body = { msg: 'The data is created！' }
})

/**
 * method: PUT
 * description: update a single income_type
 */
router.put('/:id', async (ctx: any) => {
  const id: number = Number(ctx.params.id)
  ctx.assert(!isNaN(id), 400, 'The request is invalid！')
  const data = await ctx.database.income_type.findByPk(id)
  ctx.assert(data, 404, 'The data is not found！')
  const { name, description } = ctx.request.body
  ctx.assert(name, 400, 'Some field is empty！')
  await ctx.database.income_type.update(
    { name, description },
    { where: { id }}
  )
  ctx.body = { msg: 'The data is updated！' }
})

/**
 * method: DELETE
 * description: delete a single income_type
 */
router.delete('/:id', async (ctx: any) => {
  const id: number = Number(ctx.params.id)
  ctx.assert(!isNaN(id), 400, 'The request is invalid！')
  const data = await ctx.database.income_type.findByPk(id)
  ctx.assert(data, 404, 'The data is not found！')
  await ctx.database.income_type.destroy({ where: { id }})
  ctx.status = 204
})

export default router.routes()
