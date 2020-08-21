import mysqldump from 'mysqldump'
import moment from 'moment'

const today = moment().format('YYYYMMDD')

mysqldump({
  connection: {
      host: 'localhost',
      user: 'root',
      password: 'root',
      database: 'fa_system',
  },
  dumpToFile: `database/backup/${today}.sql`,
})