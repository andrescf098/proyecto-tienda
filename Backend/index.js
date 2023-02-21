const express = require('express');
const routerApi = require('./routes/index');
const { checkApiKey } = require('./middlewares/auth.handler')
const { logErrors, errorHandler, boomErrorHandler, ormErrorHandler } = require('./middlewares/error.handler')

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Inicio del proyecto');
});
app.get('/ruta-prueba', checkApiKey ,(req, res) => {
    res.send('Sección de prueba');
})
require('./utils/auth');
routerApi(app);
app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
    console.log('Puerto: '+port)
});