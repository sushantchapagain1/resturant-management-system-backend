import express from "express";
import categoryController from "../controllers/categoryController";
import authController from "../controllers/authController";

const Router = express.Router();

Router.route("/")
  .get(authController.protect, categoryController.getAllCategory)
  .post(categoryController.createCategory);

Router.route("/:id")
  .get(categoryController.getCategory)
  .patch(categoryController.updateCategory)
  .delete(categoryController.deleteCategory);

export default Router;
