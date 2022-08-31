import express from "express";
import userController from "../controllers/userController";
import authController from "../controllers/authController";
import authMiddleware from "../middleware/authMiddleware";

const Router = express.Router();

Router.route("/signup").post(authController.signup);
Router.route("/login").post(authController.login);

Router.route("/")
  .get(
    authMiddleware.protect,
    authMiddleware.allowTo("Admin"),
    userController.getAllUsers
  )
  .post(userController.createUser);
Router.route("/:id")
  .get(authMiddleware.protect, userController.getUser)
  .patch(
    authMiddleware.protect,
    authMiddleware.allowTo("Admin"),
    userController.updateUser
  )
  .delete(
    authMiddleware.protect,
    authMiddleware.allowTo("Admin"),
    userController.deleteUser
  );

export default Router;
