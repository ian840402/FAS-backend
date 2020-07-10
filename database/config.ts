const Sequelize = require('sequelize');

let dbConfig: {};

if (process.env.NODE_ENV === 'production') {
  dbConfig = {
    dialect: 'mysql',
    host: 'us-cdbr-east-02.cleardb.com',
    database: 'heroku_570615588927825',
    username: 'bbc29957001d86',
    password: '62c1fb00',
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
