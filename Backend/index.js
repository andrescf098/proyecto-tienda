const express = require('express');
const routerApi = require('./routes/index');
const cors = require('cors');
const {
  logErrors,
  errorHandler,
  boomErrorHandler,
  ormErrorHandler,
  errorCors,
} = require('./middlewares/error.handler');
const { config } = require('./config/config');

const app = express();
const port = config.port || 3000;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

require('./utils/auth');
routerApi(app);
app.use(errorCors);
app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log('Puerto: ' + port);
});
