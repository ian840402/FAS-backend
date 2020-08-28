import Router from 'koa-router'
import moment from 'moment'
const { Op } = require('sequelize');

const router = new Router()

/**
 * method: GET
 * description: get dashboard info
 */
router.get('/dashboard', async (ctx: any) => {
  const startDate: string = `${moment().format('YYYY-MM-DD')} 00:00`
  const endDate: string = `${moment().format('YYYY-MM-DD')} 23:59`
  const data: any[] = await ctx.database.record.findAll({
    attributes: ['id', 'is_income', 'money'],
    where: {
      date: {
        [Op.gt]: startDate,
        [Op.lt]: endDate
      }
    }
  })

  const incomeTotal: number = data
    .filter((item: any) => item.is_income)
    .map((item: any) => item.money)
    .reduce((accumulator: number, currentValue: number) => accumulator + currentValue)

  const expenseTotal: number = data
    .filter((item: any) => !item.is_income)
    .map((item: any) => item.money)
    .reduce((accumulator: number, currentValue: number) => accumulator + currentValue)

  ctx.body = {
    data,
    incomeTotal,
    expenseTotal
  }
})

// TODO: 統計頁面 api 未完成
/**
 * method: GET
 * description: get statistic info
 * 
 * params: start_at, end_at
 */
router.get('/statistic', async (ctx: any) => {
  const startDate: Date = ctx.request.query.start_at || `${moment().format('YYYY-MM-DD')} 00:00`
  const endDate: Date = ctx.request.query.end_at || `${moment().format('YYYY-MM-DD')} 23:59`
  const data: any[] = await ctx.database.record.findAll({
    attributes: ['id', 'is_income', 'money'],
    where: {
      date: {
        [Op.gt]: startDate,
        [Op.lt]: endDate
      }
    }
  })

  const incomeTotal: number = data
    .filter((item: any) => item.is_income)
    .map((item: any) => item.money)
    .reduce((accumulator: number, currentValue: number) => accumulator + currentValue)

  const expenseTotal: number = data
    .filter((item: any) => !item.is_income)
    .map((item: any) => item.money)
    .reduce((accumulator: number, currentValue: number) => accumulator + currentValue)

  ctx.body = '未完成 API'
})


export default router.routes()
