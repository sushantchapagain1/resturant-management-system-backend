import express from "express";
import categoryController from "../controllers/categoryController";

const Router = express.Router();

Router.route("/")
  .get(categoryController.getAllCategory)
  .post(categoryController.createCategory);

Router.route("/:id")
  .get(categoryController.getCategory)
  .patch(categoryController.updateCategory)
  .delete(categoryController.deleteCategory);

export default Router;
