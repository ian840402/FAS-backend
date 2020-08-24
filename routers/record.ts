import Router from 'koa-router'

const router = new Router({
  prefix: '/records'
})

/**
 * method: GET
 * description: get all record
 */
router.get('/', async (ctx: any) => {
  const pageSize: number = Number(ctx.request.query.page_size) || 10
  const currentPage: number = Number(ctx.request.query.page) || 1
  const orderRule: string = ctx.request.query.order_by || 'ASC'
  const orderKey: string = ctx.request.query.order_key || 'id'
  const startPage: number = pageSize * (currentPage - 1);
  const { rows: data, count: total } = await ctx.database.record.findAndCountAll({
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
        model: ctx.database.record_type, as: 'record_type',
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
 * description: get a single record
 */
router.get('/:id', async (ctx: any) => {
  const id: number = Number(ctx.params.id)
  ctx.assert(!isNaN(id), 400, 'The request is invalid！')
  const data = await ctx.database.record.findByPk(id, {
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
        model: ctx.database.record_type, as: 'record_type',
        attributes: ['id', 'name']
      }
    ]
  })
  ctx.assert(data, 404, 'The data is not found！')
  ctx.body = data
})

/**
 * method: POST
 * description: create new record
 */
router.post('/', async (ctx: any) => {
  const { is_income, type_id, user_id, account_id, money, date, description } = ctx.request.body
  ctx.assert(type_id && user_id && account_id && money && date, 400, 'Some field is empty！')
  await ctx.database.record.create({ is_income, type_id, user_id, account_id, money, date, description })
  ctx.status = 201
  ctx.body = { msg: 'The data is created！' }
})

/**
 * method: PUT
 * description: update a single record
 */
router.put('/:id', async (ctx: any) => {
  const id: number = Number(ctx.params.id)
  ctx.assert(!isNaN(id), 400, 'The request is invalid！')
  const data = await ctx.database.record.findByPk(id)
  ctx.assert(data, 404, 'The data is not found！')
  const { is_income, type_id, user_id, account_id, money, date, description } = ctx.request.body
  ctx.assert(type_id && user_id && account_id && money && date, 400, 'Some field is empty！')
  await ctx.database.record.update(
    { is_income, type_id, user_id, account_id, money, date, description },
    { where: { id }}
  )
  ctx.body = { msg: 'The data is updated！' }
})

/**
 * method: DELETE
 * description: delete a single record
 */
router.delete('/:id', async (ctx: any) => {
  const id: number = Number(ctx.params.id)
  ctx.assert(!isNaN(id), 400, 'The request is invalid！')
  const data = await ctx.database.record.findByPk(id)
  ctx.assert(data, 404, 'The data is not found！')
  await ctx.database.record.destroy({ where: { id }})
  ctx.status = 204
})

export default router.routes()
