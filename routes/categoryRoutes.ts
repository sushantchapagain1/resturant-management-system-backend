import express from "express";
import categoryController from "../controllers/categoryController";
import authMiddleware from "../middleware/authMiddleware";

const Router = express.Router();

Router.route("/")
  .get(categoryController.getAllCategory)
  .post(
    authMiddleware.protect,
    authMiddleware.allowTo("Admin"),
    categoryController.createCategory
  );

Router.route("/:id")
  .get(authMiddleware.protect, categoryController.getCategory)
  .patch(
    authMiddleware.protect,
    authMiddleware.allowTo("Admin"),
    categoryController.updateCategory
  )
  .delete(
    authMiddleware.protect,
    authMiddleware.allowTo("Admin"),
    categoryController.deleteCategory
  );

export default Router;
