const Sequelize = require('sequelize');
import db from '../config'

const RecordType = db.define('record_type', {
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
  is_income: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  description: {
    type: Sequelize.TEXT,
  },
}, {
  freezeTableName: true,
  timestamps: true,
  underscored: true,
})

export default RecordType;
