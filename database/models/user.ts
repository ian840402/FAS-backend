const Sequelize = require('sequelize');
import db from '../config'

const User = db.define('user', {
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
  description: {
    type: Sequelize.TEXT,
  },
}, {
  freezeTableName: true,
  timestamps: true,
  underscored: true,
})

export default User;
