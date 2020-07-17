import db from '../config'
import User from './user'
import Account from './account'
import RecordType from './record-type'

const Record = db.sequelize.define('record', {
  id: {
    type: db.Sequelize.INTEGER.UNSIGNED,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  is_income: {
    type: db.Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  type_id: {
    type: db.Sequelize.INTEGER.UNSIGNED,
    allowNull: false,
    references: {
      model: RecordType,
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

export default Record;
