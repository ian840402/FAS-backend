import Router from 'koa-router'

const router = new Router({
  prefix: '/users'
})

/**
 * method: GET
 * description: get all user
 */
router.get('/', async (ctx: any) => {
  ctx.body = 'user'
})

/**
 * method: GET
 * description: get a single user
 */
router.get('/:id', async (ctx: any) => {
  ctx.body = 'user'
})

/**
 * method: POST
 * description: create new user
 */
router.post('/', async (ctx: any) => {
  ctx.body = 'user'
})

/**
 * method: PUT
 * description: update a single user
 */
router.put('/:id', async (ctx: any) => {
  ctx.body = 'user'
})

/**
 * method: DELETE
 * description: delete a single user
 */
router.delete('/:id', async (ctx: any) => {
  ctx.body = 'user'
})

export default router.routes()
