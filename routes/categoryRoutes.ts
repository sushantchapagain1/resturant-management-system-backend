import express from "express";
import categoryController from "../controllers/categoryController";

const Router = express.Router();

Router.route("/")
  .get(categoryController.getCategory)
  .post(categoryController.createCategory);

export default Router;
