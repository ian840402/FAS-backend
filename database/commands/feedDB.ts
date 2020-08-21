import colors from 'colors'
import { databaseModel } from '../index'
import feedUser from '../feed/user'
import feedAccount from '../feed/account'
import feedRecordType from '../feed/record-type'

const count: number = 10

const feedData = async () => {
  try {
    await feedUser(count)
    console.log('\nFeed new User data！\n'.green)

    await feedRecordType(count)
    console.log('\nFeed new Record-Type data！\n'.green)

    await feedAccount(count)
    console.log('\nFeed new Account data！\n'.green)

    await databaseModel.sequelize.close()
    console.log('Feed data finish！'.green)

  } catch (error) {
    await databaseModel.sequelize.close()
    console.log(colors.red(error))
  }
}

feedData()
