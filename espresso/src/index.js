const express = require('express')
const { APP_HOST, APP_PORT } = require('./config/server-config.js');


const app = express();

app.get('/', (req, res) => {
  res.send(`Welcome to xyz !!`);
});

app.listen(APP_PORT, () => {
  console.log(`Server running on the http://${APP_HOST}:${APP_PORT}`);
});
