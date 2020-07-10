import db from '../config'
import User from './user'

const Account = db.sequelize.define('account', {
  id: {
    type: db.Sequelize.INTEGER.UNSIGNED,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: db.Sequelize.STRING,
    allowNull: false,
  },
  bank: {
    type: db.Sequelize.STRING,
    allowNull: false,
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
  init_money: {
    type: db.Sequelize.INTEGER.UNSIGNED,
    defaultValue: 0,
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

export default Account;
