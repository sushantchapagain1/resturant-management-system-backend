import express from "express";
import orderController from "../controllers/orderController";

const Router = express.Router();

Router.route("/")
  .get(orderController.getOrders)
  .post(orderController.createOrder);

Router.route("/:id")
  .get(orderController.getOrder)
  .patch(orderController.updateOrder)
  .delete(orderController.deleteOrder);

export default Router;
