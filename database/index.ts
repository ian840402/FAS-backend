import database from './config'
import User from './models/user'
import Account from './models/account'
import Income from './models/income'
import IncomeType from './models/income-type'
import Expenses from './models/expenses'
import ExpensesType from './models/expenses-type'

/**
 * 封裝整個 db instance，並定義模型關聯
 */
const databaseInstance = async (ctx: any, next: any) => {
  
  // User model references
  User.hasMany(Account, { foreignKey: 'user_id', sourcesKey: 'id' });
  User.hasMany(Income, { foreignKey: 'user_id', sourcesKey: 'id' });
  User.hasMany(Expenses, { foreignKey: 'user_id', sourcesKey: 'id' });

  // Account model references
  Account.belongsTo(User, { foreignKey: 'user_id', sourcesKey: 'id' });
  Account.hasMany(Income, { foreignKey: 'account_id', sourcesKey: 'id' });
  Account.hasMany(Expenses, { foreignKey: 'account_id', sourcesKey: 'id' });

  // Income model references
  Income.belongsTo(User, { foreignKey: 'user_id', sourcesKey: 'id' });
  Income.belongsTo(Account, { foreignKey: 'account_id', sourcesKey: 'id' });
  Income.belongsTo(IncomeType, { foreignKey: 'type_id', sourcesKey: 'id' });

  // IncomeType model references
  IncomeType.hasMany(Income, { foreignKey: 'account_id', sourcesKey: 'id' });

  // Expenses model references
  Expenses.belongsTo(User, { foreignKey: 'user_id', sourcesKey: 'id' });
  Expenses.belongsTo(Account, { foreignKey: 'account_id', sourcesKey: 'id' });
  Expenses.belongsTo(ExpensesType, { foreignKey: 'type_id', sourcesKey: 'id' });

  // ExpensesType model references
  ExpensesType.hasMany(Expenses, { foreignKey: 'account_id', sourcesKey: 'id' });
  
  ctx.database = {
    ...database,
    user: User,
    account: Account,
    income: Income,
    income_type: IncomeType,
    expenses: Expenses,
    expenses_type: ExpensesType,
  }
  await next();
};

export default databaseInstance;
