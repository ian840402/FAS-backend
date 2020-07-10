import Router from 'koa-router'

const router = new Router({
  prefix: '/income_types'
})

/**
 * method: GET
 * description: get all income_type
 */
router.get('/', async (ctx: any) => {
  ctx.body = 'income_type'
})

/**
 * method: GET
 * description: get a single income_type
 */
router.get('/:id', async (ctx: any) => {
  ctx.body = 'income_type'
})

/**
 * method: POST
 * description: create new income_type
 */
router.post('/', async (ctx: any) => {
  ctx.body = 'income_type'
})

/**
 * method: PUT
 * description: update a single income_type
 */
router.put('/:id', async (ctx: any) => {
  ctx.body = 'income_type'
})

/**
 * method: DELETE
 * description: delete a single income_type
 */
router.delete('/:id', async (ctx: any) => {
  ctx.body = 'income_type'
})

export default router.routes()
