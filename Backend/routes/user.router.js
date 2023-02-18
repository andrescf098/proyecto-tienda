const express = require("express");
const validatorHandler = require("./../middlewares/validatior.handler");
const { getUserSchema, createUserSchema, updateUserSchema } = require("./../schemas/user.schema");
const UserService = require("../service/user.service");

const router = express.Router();
const service = new UserService();

router.get('/',
    validatorHandler(getUserSchema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            res.json(await service.find())
        } catch (error) {
            next(error);
        }
    }
);

router.get('/:id',
    validatorHandler(getUserSchema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            res.json(await service.findOne(id));
        } catch (error) {
            next(error);
        }
    }
);

router.post('/',
    validatorHandler(createUserSchema, 'body'),
    async (req, res, next) => {
        try {
            const body = req.body;
            res.status(201).json(await service.create(body));
        } catch (error) {
            next(error);
        }
    }
);

router.patch('/:id',
    validatorHandler(getUserSchema, 'params'),
    validatorHandler(updateUserSchema, 'body'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const body = req.body;
            res.json(await service.update(id, body));
        } catch (error) {
            next(error);
        }
    }
);

router.delete('/',
    validatorHandler(getUserSchema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            res.status(201).json(await service.delete(id));
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;
