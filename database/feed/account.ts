import faker from 'faker'
import { databaseModel } from '../index'

type Account = {
  name: string,
  bank: string,
  user_id: number,
  init_money: number,
  description: string
}

const feedAccount = async (count: number) => {
  const fakeDataArr: Account[] = []
  for (let i = 0; i < count; i++) {
    const fakeData: Account = {
      name: faker.name.findName(),
      bank: faker.name.findName(),
      user_id: Math.floor(Math.random() * 10) + 1,
      init_money: Math.floor(Math.random() * 1000),
      description: faker.lorem.paragraph()
    }
    fakeDataArr.push(fakeData)
  }
  await databaseModel.account.bulkCreate(fakeDataArr)
}

export default feedAccount
