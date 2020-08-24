import faker from 'faker'
import { databaseModel } from '../index'

type Account = {
  name: string,
  bank: string,
  bank_account: string | null,
  user_id: number,
  init_money: number,
  description: string
}

const feedAccount = async (count: number) => {
  const fakeDataArr: Account[] = []
  const userData: [] = await databaseModel.user.findAll({ offset: 0, limit: count, raw: true })
  const idArray: any[] = userData.map((item: any) => item.id )

  for (let i = 0; i < count; i++) {
    const fakeData: Account = {
      name: faker.name.findName(),
      bank: faker.name.findName(),
      bank_account: null,
      user_id: idArray[Math.floor(Math.random() * count)],
      init_money: Math.floor(Math.random() * 1000),
      description: faker.lorem.paragraph()
    }
    fakeDataArr.push(fakeData)
  }
  await databaseModel.account.bulkCreate(fakeDataArr)
}

export default feedAccount
