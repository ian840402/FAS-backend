import faker from 'faker'
import { databaseModel } from '../index'

type Type = {
  name: string,
  is_income: boolean,
  description: string
}

const feedType = async (count: number) => {
  const fakeDataArr: Type[] = []
  for (let i = 0; i < count; i++) {
    const fakeData: Type = {
      name: faker.name.findName(),
      is_income: Math.floor(Math.random() * 2) === 1,
      description: faker.lorem.paragraph()
    }
    fakeDataArr.push(fakeData)
  }

  await databaseModel.record_type.bulkCreate(fakeDataArr)
}

export default feedType
