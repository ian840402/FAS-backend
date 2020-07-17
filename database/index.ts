import database from './config'
import User from './models/user'
import Account from './models/account'
import Record from './models/record'
import RecordType from './models/record-type'

/**
 * 封裝整個 db instance，並定義模型關聯
 */
const databaseInstance = async (ctx: any, next: any) => {
  
  // User model references
  User.hasMany(Account, { foreignKey: 'user_id', sourcesKey: 'id' });
  User.hasMany(Record, { foreignKey: 'user_id', sourcesKey: 'id' });

  // Account model references
  Account.belongsTo(User, { foreignKey: 'user_id', sourcesKey: 'id' });
  Account.hasMany(Record, { foreignKey: 'account_id', sourcesKey: 'id' });

  // Record model references
  Record.belongsTo(User, { foreignKey: 'user_id', sourcesKey: 'id' });
  Record.belongsTo(Account, { foreignKey: 'account_id', sourcesKey: 'id' });
  Record.belongsTo(RecordType, { foreignKey: 'type_id', sourcesKey: 'id' });

  // RecordType model references
  RecordType.hasMany(Record, { foreignKey: 'account_id', sourcesKey: 'id' });
  
  ctx.database = {
    ...database,
    user: User,
    account: Account,
    record: Record,
    record_type: RecordType,
  }
  await next();
};

export default databaseInstance;
