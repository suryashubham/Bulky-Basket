const express = require('express');

const { APP_HOST, APP_PORT } = require('./config/server-config');
const { ErrorHandlerMiddleware } = require('./middlewares');
const apiRoutes = require('./routes');


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRoutes);

app.use(ErrorHandlerMiddleware);

app.listen(APP_PORT, () => {
  console.log(`Server running on the http://${APP_HOST}:${APP_PORT}`);
});
