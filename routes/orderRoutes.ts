import express from "express";
import orderController from "../controllers/orderController";

const Router = express.Router();

Router.route("/")
  .get(orderController.getOrders)
  .post(orderController.createOrder);

export default Router;
