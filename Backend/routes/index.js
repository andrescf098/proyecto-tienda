const express = require('express');
const productRouter = require('./product.router')
const categoryRouter = require('./category.reouter')

function routerApi(app) {
    const router = express.Router();
    app.use('/api/v1', router);
    router.use('/products', productRouter);
    router.use('/categories', categoryRouter);
}

module.exports = routerApi;