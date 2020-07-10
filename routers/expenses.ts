import Router from 'koa-router'

const router = new Router({
  prefix: '/expenses'
})

/**
 * method: GET
 * description: get all expenses
 */
router.get('/', async (ctx: any) => {
  ctx.body = 'expenses'
})

/**
 * method: GET
 * description: get a single expenses
 */
router.get('/:id', async (ctx: any) => {
  ctx.body = 'expenses'
})

/**
 * method: POST
 * description: create new expenses
 */
router.post('/', async (ctx: any) => {
  ctx.body = 'expenses'
})

/**
 * method: PUT
 * description: update a single expenses
 */
router.put('/:id', async (ctx: any) => {
  ctx.body = 'expenses'
})

/**
 * method: DELETE
 * description: delete a single expenses
 */
router.delete('/:id', async (ctx: any) => {
  ctx.body = 'expenses'
})

export default router.routes()
