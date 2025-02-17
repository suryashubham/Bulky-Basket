const express = require('express')
const { APP_HOST, APP_PORT } = require('./config/server-config.js');
const logger = require('./utils/logger.js');


const app = express();

app.get('/', (req, res) => {
  logger.info('Request received');
  res.send(`Welcome to xyz !!`);
  logger.error('Request processed');
});

app.listen(APP_PORT, () => {
  console.log(`Server running on the http://${APP_HOST}:${APP_PORT}`);
});
