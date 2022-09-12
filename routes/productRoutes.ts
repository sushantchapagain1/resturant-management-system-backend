import express from "express";
import productController from "../controllers/productController";
import authMiddleware from "../middleware/authMiddleware";
const Router = express.Router();

Router.route("/")
  .get(productController.getProducts)
  .post(
    authMiddleware.protect,
    authMiddleware.allowTo("Admin"),
    productController.createProduct
  );
Router.route("/:id")
  .get(
    authMiddleware.protect,
    authMiddleware.allowTo("Admin"),
    productController.getProduct
  )
  .patch(
    authMiddleware.protect,
    authMiddleware.allowTo("Admin"),
    productController.updateProduct
  )
  .delete(
    authMiddleware.protect,
    authMiddleware.allowTo("Admin"),
    productController.deleteProduct
  );

export default Router;
