import faker from 'faker'
import { databaseModel } from '../index'

type User = {
  name: string,
  description: string
}

const feedUser = async (count: number) => {
  const fakeDataArr: User[] = []
  for (let i = 0; i < count; i++) {
    const fakeData: User = {
      name: faker.name.findName(),
      description: faker.lorem.paragraph()
    }
    fakeDataArr.push(fakeData)
  }

  await databaseModel.user.bulkCreate(fakeDataArr)
}

export default feedUser
