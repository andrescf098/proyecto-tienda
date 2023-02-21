const express = require('express');
const productRouter = require('./product.router');
const categoryRouter = require('./category.reouter');
const userRouter = require('./user.router');
const authRouter = require('./auth.router')

function routerApi(app) {
    const router = express.Router();
    app.use('/api/v1', router);
    router.use('/products', productRouter);
    router.use('/categories', categoryRouter);
    router.use('/users', userRouter);
    router.use('/auth', authRouter);
}

module.exports = routerApi;