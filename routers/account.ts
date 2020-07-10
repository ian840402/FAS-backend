import Router from 'koa-router'

const router = new Router({
  prefix: '/accounts'
})

/**
 * method: GET
 * description: get all account
 */
router.get('/', async (ctx: any) => {
  ctx.body = 'account'
})

/**
 * method: GET
 * description: get a single account
 */
router.get('/:id', async (ctx: any) => {
  ctx.body = 'account'
})

/**
 * method: POST
 * description: create new account
 */
router.post('/', async (ctx: any) => {
  ctx.body = 'account'
})

/**
 * method: PUT
 * description: update a single account
 */
router.put('/:id', async (ctx: any) => {
  ctx.body = 'account'
})

/**
 * method: DELETE
 * description: delete a single account
 */
router.delete('/:id', async (ctx: any) => {
  ctx.body = 'account'
})

export default router.routes()
