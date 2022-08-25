import express from "express";
import userController from "../controllers/userController";
import authController from "../controllers/authController";
const Router = express.Router();

Router.route("/signup").post(authController.signup);
Router.route("/login").post(authController.login);

Router.route("/")
  .get(userController.getAllUsers)
  .post(userController.createUser);
Router.route("/:id")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

export default Router;
