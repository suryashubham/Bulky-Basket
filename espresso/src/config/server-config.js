const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  //DB
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.PORT,
  DB_NAME: process.env.DB_NAME,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  //APP
  APP_HOST: process.env.APP_HOST,
  APP_PORT: process.env.APP_PORT,
  APP_NAME: process.env.APP_NAME,
  APP_ENV: process.env.APP_ENV,
  //SESSION
  SESSION_SECRET: process.env.SESSION_SECRET,
  SESSION_VAIDITY: process.env.SESSION_VAIDITY,
  //JWT
  JWT_TOKEN_VALIDITY: process.env.JWT_TOKEN_VALIDITY,
}
