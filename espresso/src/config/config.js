const config = require('./server-config');
const { DB_USER, DB_PASSWORD, DB_NAME, DB_HOST } = config;


module.exports = {
  development: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    dialect: 'postgres',
  },
  test: {
    username: '',
    password: '',
    database: '',
    host: '',
    dialect: ''
  },
  production: {
    username: '',
    password: '',
    database: '',
    host: '',
  }
};

