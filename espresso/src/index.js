import express from 'express';


import config from "./config/server-config.js";

const { APP_PORT, DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, APP_HOST } = config;

const app = express();

// Access environment variables
const port = APP_PORT || 3000;

app.get('/', (req, res) => {
  res.send(`Welcome to  ${DB_HOST}!,${DB_USER}!, ${DB_PASSWORD}!, ${DB_NAME}!!`);
});

app.listen(port, () => {
  console.log(`Server running on http://${APP_HOST}:${port}`);
});
