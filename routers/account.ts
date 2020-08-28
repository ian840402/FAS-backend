import Router from 'koa-router'

const router = new Router({
  prefix: '/accounts'
})

/**
 * method: GET
 * description: get all account
 * 
 * params: page_size, page, order_by, order_key
 */
router.get('/', async (ctx: any) => {
  const pageSize: number = Number(ctx.request.query.page_size) || 10
  const currentPage: number = Number(ctx.request.query.page) || 1
  const orderRule: string = ctx.request.query.order_by || 'ASC'
  const orderKey: string = ctx.request.query.order_key || 'id'
  const startPage: number = pageSize * (currentPage - 1);
  const { rows: data, count: total } = await ctx.database.account.findAndCountAll({
    attributes: {
      exclude: ['user_id'],
    },
    include: [{
      model: ctx.database.user, as: 'user',
      attributes: ['id', 'name']
    }],
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
 * description: get a single account
 */
router.get('/:id', async (ctx: any) => {
  const id: number = Number(ctx.params.id)
  ctx.assert(!isNaN(id), 400, 'The request is invalid！')
  const data = await ctx.database.account.findByPk(id, {
    attributes: {
      exclude: ['user_id'],
    },
    include: [{
      model: ctx.database.user, as: 'user',
      attributes: ['id', 'name']
    }]
  })
  ctx.assert(data, 404, 'The data is not found！')
  ctx.body = data
})

/**
 * method: POST
 * description: create new account
 */
router.post('/', async (ctx: any) => {
  const { name, bank, bank_account, user_id, init_money, description } = ctx.request.body
  ctx.assert(name && bank && user_id && init_money, 400, 'Some field is empty！')
  await ctx.database.account.create({ name, bank, bank_account, user_id, init_money, description })
  ctx.status = 201
  ctx.body = { msg: 'The data is created！' }
})

/**
 * method: PUT
 * description: update a single account
 */
router.put('/:id', async (ctx: any) => {
  const id: number = Number(ctx.params.id)
  ctx.assert(!isNaN(id), 400, 'The request is invalid！')
  const data = await ctx.database.account.findByPk(id)
  ctx.assert(data, 404, 'The data is not found！')
  const { name, bank, bank_account, user_id, init_money, description } = ctx.request.body
  ctx.assert(name && bank && user_id && init_money, 400, 'Some field is empty！')
  await ctx.database.account.update(
    { name, bank, bank_account, user_id, init_money, description },
    { where: { id }}
  )
  ctx.body = { msg: 'The data is updated！' }
})

/**
 * method: DELETE
 * description: delete a single account
 */
router.delete('/:id', async (ctx: any) => {
  const id: number = Number(ctx.params.id)
  ctx.assert(!isNaN(id), 400, 'The request is invalid！')
  const data = await ctx.database.account.findByPk(id)
  ctx.assert(data, 404, 'The data is not found！')
  await ctx.database.account.destroy({ where: { id }})
  ctx.status = 204
})

export default router.routes()
