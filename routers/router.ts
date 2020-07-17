import Router from 'koa-router'
import accountRoute from './account'
import userRoute from './user'
import recordRoute from './record'
import recordTypeRoute from './record-type'
import dbControl from './database'

const router = new Router()

router.get('/', async (ctx: any) => {
  ctx.body = 'Hello world'
})

router.use(accountRoute)
router.use(userRoute)
router.use(recordRoute)
router.use(recordTypeRoute)
router.use(dbControl)

export default router