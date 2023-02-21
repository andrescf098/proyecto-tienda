const express = require("express");
const passport = require("passport");
const validatorHandler = require("./../middlewares/validatior.handler");
const {
  getCategorySchema,
  createCategorySchema,
  updateCategorySchema,
} = require("./../schemas/category.schema");
const { checkRole } = require('./../middlewares/auth.handler')
const CategoryService = require("../service/category.service");

const router = express.Router();
const service = new CategoryService();

router.get("/", async (req, res, next) => {
  try {
    res.json(await service.find());
  } catch (error) {
    next(error);
  }
});
router.get(
  "/:id",
  validatorHandler(getCategorySchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      res.json(await service.findOne(id));
    } catch (error) {
      next(error);
    }
  }
);
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  checkRole('admin'),
  validatorHandler(createCategorySchema, "body"),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newCategory = await service.create(body);
      res.status(201).json(newCategory);
    } catch (error) {
      next(error);
    }
  }
);
router.patch(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  checkRole('admin'),
  validatorHandler(getCategorySchema, "params"),
  validatorHandler(updateCategorySchema, "body"),
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
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  checkRole('admin'),
  validatorHandler(getCategorySchema, "params"),
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
