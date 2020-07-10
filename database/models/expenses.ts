import db from '../config'
import User from './user'
import Account from './account'
import ExpensesType from './income-type'

const Expenses = db.sequelize.define('expenses', {
  id: {
    type: db.Sequelize.INTEGER.UNSIGNED,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  type_id: {
    type: db.Sequelize.INTEGER.UNSIGNED,
    allowNull: false,
    references: {
      model: ExpensesType,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'NO ACTION',
  },
  account_id: {
    type: db.Sequelize.INTEGER.UNSIGNED,
    allowNull: false,
    references: {
      model: Account,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'NO ACTION',
  },
  user_id: {
    type: db.Sequelize.INTEGER.UNSIGNED,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'NO ACTION',
  },
  money: {
    type: db.Sequelize.INTEGER.UNSIGNED,
    defaultValue: 0,
    allowNull: false,
  },
  date: {
    type: db.Sequelize.DATE,
    defaultValue: db.Sequelize.NOW,
    allowNull: false,
  },
  description: {
    type: db.Sequelize.TEXT,
  },
}, {
  freezeTableName: true,
  timestamps: true,
  underscored: true,
})

export default Expenses;
