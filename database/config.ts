const Sequelize = require('sequelize');

let dbConfig: {};

if (process.env.NODE_ENV === 'production') {
  dbConfig = {
    dialect: 'mysql',
    host: 'us-cdbr-east-02.cleardb.com',
    database: 'heroku_815bd72d2f345e1',
    username: 'ba73d089ee519f',
    password: '156e695f',
  }
} else {
  dbConfig = {
    dialect: 'mysql',
    host: 'localhost',
    database: 'fa_system',
    username: 'root',
    password: 'root',
  }
}

const sequelize = new Sequelize({
  ...dbConfig,
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

export default {
  sequelize,
  Sequelize,
};
