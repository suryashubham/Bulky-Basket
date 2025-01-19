const express = require('express')
const config = require('./config/server-config.js');
const { DB_USER, DB_PASSWORD, DB_NAME, DB_HOST, APP_HOST, APP_PORT } = config;

const app = express();

// Access environment variables
const port = APP_PORT || 8000;

app.get('/', (req, res) => {
  createUserWithAddresses();
  res.send(`Welcome to  ${DB_HOST}!,${DB_USER}!, ${DB_PASSWORD}!, ${DB_NAME}!!`);
});

app.listen(port, () => {
  console.log(`Server running on http://${APP_HOST}:${port}`);
});
