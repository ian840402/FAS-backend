import db from '../config'

const ExpensesType = db.sequelize.define('expenses_type', {
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
  description: {
    type: db.Sequelize.TEXT,
  },
}, {
  freezeTableName: true,
  timestamps: true,
  underscored: true,
})

export default ExpensesType;
