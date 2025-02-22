const express = require('express');
const cors = require('cors');

const { APP_HOST, APP_PORT } = require('./config/server-config');
const { ErrorHandlerMiddleware } = require('./middlewares');
const sessionMiddleware = require('./utils/auth-utils/session-config');
const apiRoutes = require('./routes');


const app = express();

app.use(cors());
app.use(express.json());
app.use(sessionMiddleware);
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRoutes);

app.use(ErrorHandlerMiddleware);

app.listen(APP_PORT, () => {
  console.log(`Server running on the http://${APP_HOST}:${APP_PORT}`);
});
