import Router from 'koa-router'
import moment from 'moment'
import { RecordType, RecordData } from '../models/records'

const { Op } = require('sequelize')


const router = new Router({
  prefix: '/records'
})


/**
 * method: GET
 * description: get all record
 * 
 * params: page_size, page, order_by, order_key
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
 * method: GET
 * description: get period data
 * 
 * params: start_at, end_at
 */
router.get('/statistic/period', async (ctx: any) => {
  const start: string = ctx.request.query.start_at || new Date()
  const end: string = ctx.request.query.end_at || new Date()
  const startDate: string = `${moment(start).format('YYYY-MM-DD')} 00:00`
  const endDate: string = `${moment(end).format('YYYY-MM-DD')} 23:59`
  const data: RecordType[] = await ctx.database.record.findAll({
    where: {
      date: {
        [Op.gt]: startDate,
        [Op.lt]: endDate
      }
    }
  })

  const recordData = new RecordData(data)

  ctx.body = {
    data: recordData.getData(),
    incomeTotal: recordData.getIncomeMoneyTotal(),
    expenseTotal: recordData.getExpenseMoneyTotal()
  }
})


/**
 * method: GET
 * description: get statistic data
 */
router.get('/statistic/info', async (ctx: any) => {  
  const currentQuarter: number = moment().quarter()
  const currentYear: number = moment().year()
  const currentMonth: number = moment().month()

  // First day of current quarter
  const quarterStart: string = moment(`${currentYear}-01-01`)
    .quarter(currentQuarter)
    .format('YYYY-MM-DD')
  
  // Last day of current quarter
  const endMonth: number = 3 * currentQuarter
  const endMonthDay: number = moment(currentYear + '-' + endMonth).daysInMonth()
  const quarterEnd: string = moment(`${currentYear}-${endMonth}-${endMonthDay}`)
    .format('YYYY-MM-DD')

  // The current quarter data
  const quarterData: RecordType[] = await ctx.database.record.findAll({
    where: {
      date: {
        [Op.gt]: `${quarterStart} 00:00`,
        [Op.lt]: `${quarterEnd} 23:59`
      }
    }
  })

  // The current month data
  const monthData = quarterData
    .filter((item: RecordType) => {
      return moment(item.date).month() === currentMonth
    })

  // The today data
  const todayData = quarterData
    .filter((item: RecordType) => {
      return moment(item.date).format('YYYY-MM-DD') === moment().format('YYYY-MM-DD')
    })

  const quarterRecordData = new RecordData(quarterData)
  const monthRecordData = new RecordData(monthData)
  const todayRecordData = new RecordData(todayData)

  ctx.body = {
    quarter: {
      income: quarterRecordData.getIncomeMoneyTotal(),
      expense: quarterRecordData.getExpenseMoneyTotal()
    },
    month: {
      income: monthRecordData.getIncomeMoneyTotal(),
      expense: monthRecordData.getExpenseMoneyTotal()
    },
    today: {
      income: todayRecordData.getIncomeMoneyTotal(),
      expense: todayRecordData.getExpenseMoneyTotal()
    }
  }
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
