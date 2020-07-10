import Router from 'koa-router'

const router = new Router({
  prefix: '/incomes'
})

/**
 * method: GET
 * description: get all income
 */
router.get('/', async (ctx: any) => {
  const pageSize: number = Number(ctx.request.query.page_size) || 10
  const currentPage: number = Number(ctx.request.query.page) || 1
  const orderRule: string = ctx.request.query.order_by || 'ASC'
  const orderKey: string = ctx.request.query.order_key || 'id'
  const startPage: number = pageSize * (currentPage - 1);
  const { rows: data, count: total } = await ctx.database.income.findAndCountAll({
    attributes: {
      exclude: ['user_id', 'account_id', 'type_id'],
    },
    include: [
      {
        model: ctx.database.user, as: 'user',
        attributes: ['id', 'name']
      },
      {
        model: ctx.database.account, as: 'account',
        attributes: ['id', 'name']
      },
      {
        model: ctx.database.income_type, as: 'income_type',
        attributes: ['id', 'name']
      }
    ],
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
 * description: get a single income
 */
router.get('/:id', async (ctx: any) => {
  const id: number = Number(ctx.params.id)
  ctx.assert(!isNaN(id), 400, 'The request is invalid！')
  const data = await ctx.database.income.findByPk(id)
  ctx.assert(data, 404, 'The data is not found！')
  ctx.body = data
})

/**
 * method: POST
 * description: create new income
 */
router.post('/', async (ctx: any) => {
  const { type_id, user_id, account_id, money, date, description } = ctx.request.body
  ctx.assert(type_id && user_id && account_id && money && date, 400, 'Some field is empty！')
  await ctx.database.income.create({ type_id, user_id, account_id, money, date, description })
  ctx.status = 201
  ctx.body = { msg: 'The data is created！' }
})

/**
 * method: PUT
 * description: update a single income
 */
router.put('/:id', async (ctx: any) => {
  const id: number = Number(ctx.params.id)
  ctx.assert(!isNaN(id), 400, 'The request is invalid！')
  const data = await ctx.database.income.findByPk(id)
  ctx.assert(data, 404, 'The data is not found！')
  const { type_id, user_id, account_id, money, date, description } = ctx.request.body
  ctx.assert(type_id && user_id && account_id && money && date, 400, 'Some field is empty！')
  await ctx.database.income.update(
    { type_id, user_id, account_id, money, date, description },
    { where: { id }}
  )
  ctx.body = { msg: 'The data is updated！' }
})

/**
 * method: DELETE
 * description: delete a single income
 */
router.delete('/:id', async (ctx: any) => {
  const id: number = Number(ctx.params.id)
  ctx.assert(!isNaN(id), 400, 'The request is invalid！')
  const data = await ctx.database.income.findByPk(id)
  ctx.assert(data, 404, 'The data is not found！')
  await ctx.database.income.destroy({ where: { id }})
  ctx.status = 204
})

export default router.routes()
