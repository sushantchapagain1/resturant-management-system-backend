import express from "express";
import orderController from "../controllers/orderController";
import authMiddleware from "../middleware/authMiddleware";

const Router = express.Router();

Router.route("/")
  .get(authMiddleware.protect, orderController.getOrders)
  .post(
    authMiddleware.protect,
    authMiddleware.allowTo("Customer"),
    orderController.createOrder
  );

Router.route("/:id")
  .get(
    authMiddleware.protect,
    authMiddleware.allowTo("Customer", "Manager"),
    orderController.getOrder
  )
  .patch(
    authMiddleware.protect,
    authMiddleware.allowTo("Customer", "Manager"),
    orderController.updateOrder
  )
  .delete(
    authMiddleware.protect,
    authMiddleware.allowTo("Customer", "Manager"),
    orderController.deleteOrder
  );

export default Router;
