import colors from 'colors'
import { databaseModel } from '../index'

const database = databaseModel

try {
  database.sequelize.sync({ force: true }).then(() => {
    console.log(colors.green('\n資料表同步完成\n'))
    database.sequelize.close()
  })
} catch (error){
  database.sequelize.close()
  console.log(colors.red('\n資料表同步失敗\n'))
  console.log(colors.red(error))
}
