import Router from 'koa-router'

const router = new Router({
  prefix: '/incomes'
})

/**
 * method: GET
 * description: get all income
 */
router.get('/', async (ctx: any) => {
  ctx.body = 'income'
})

/**
 * method: GET
 * description: get a single income
 */
router.get('/:id', async (ctx: any) => {
  ctx.body = 'income'
})

/**
 * method: POST
 * description: create new income
 */
router.post('/', async (ctx: any) => {
  ctx.body = 'income'
})

/**
 * method: PUT
 * description: update a single income
 */
router.put('/:id', async (ctx: any) => {
  ctx.body = 'income'
})

/**
 * method: DELETE
 * description: delete a single income
 */
router.delete('/:id', async (ctx: any) => {
  ctx.body = 'income'
})

export default router.routes()
