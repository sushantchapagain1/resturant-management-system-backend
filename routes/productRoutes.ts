import express from "express";
import productController from "../controllers/productController";
const Router = express.Router();

Router.route("/")
  .get(productController.getProducts)
  .post(productController.createProduct);
Router.route("/:id")
  .get(productController.getProduct)
  .patch(productController.updateProduct)
  .delete(productController.deleteProduct);

export default Router;
