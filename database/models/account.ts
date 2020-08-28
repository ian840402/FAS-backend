const Sequelize = require('sequelize');
import db from '../config'
import User from './user'

const Account = db.define('account', {
  id: {
    type: Sequelize.INTEGER.UNSIGNED,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  bank: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  bank_account: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  user_id: {
    type: Sequelize.INTEGER.UNSIGNED,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'NO ACTION',
  },
  init_money: {
    type: Sequelize.INTEGER.UNSIGNED,
    defaultValue: 0,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
  },
}, {
  freezeTableName: true,
  timestamps: true,
  underscored: true,
})

export default Account;
