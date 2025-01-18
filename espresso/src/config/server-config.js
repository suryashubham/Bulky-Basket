import dotenv from 'dotenv';
dotenv.config();

console.log(process.env.DB_HOST);


export default {
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
}
