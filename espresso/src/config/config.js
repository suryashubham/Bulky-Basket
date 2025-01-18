import { } from "./server-config"

export default {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'mysql',
  },
  test: {
    username: root,
    password: process.env.DB_PASSWORD,
    database: database_test,
    host: process.env.DB_HOST,
    dialect: mysql
  },
  production: {
    username: root,
    password: process.env.DB_PASSWORD,
    database: database_production,
    host: process.env.DB_HOST,
  }
};

