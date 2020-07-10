import Router from 'koa-router'

const router = new Router({
  prefix: '/expenses_types'
})

/**
 * method: GET
 * description: get all expenses_type
 */
router.get('/', async (ctx: any) => {
  ctx.body = 'expenses_type'
})

/**
 * method: GET
 * description: get a single expenses_type
 */
router.get('/:id', async (ctx: any) => {
  ctx.body = 'expenses_type'
})

/**
 * method: POST
 * description: create new expenses_type
 */
router.post('/', async (ctx: any) => {
  ctx.body = 'expenses_type'
})

/**
 * method: PUT
 * description: update a single expenses_type
 */
router.put('/:id', async (ctx: any) => {
  ctx.body = 'expenses_type'
})

/**
 * method: DELETE
 * description: delete a single expenses_type
 */
router.delete('/:id', async (ctx: any) => {
  ctx.body = 'expenses_type'
})

export default router.routes()
