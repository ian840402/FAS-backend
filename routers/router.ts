import Router from 'koa-router'
import accountRoute from './account'
import userRoute from './user'
import incomeRoute from './income'
import incomeTypeRoute from './income-type'
import expensesRoute from './expenses'
import expensesTypeRoute from './expenses-type'
import dbControl from './database'

const router = new Router()

router.get('/', async (ctx: any) => {
  ctx.body = 'Hello world'
})

router.use(accountRoute)
router.use(userRoute)
router.use(incomeRoute)
router.use(incomeTypeRoute)
router.use(expensesRoute)
router.use(expensesTypeRoute)
router.use(dbControl)

export default router