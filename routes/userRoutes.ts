import express from "express";
import userController from "../controllers/userController";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const Router = express.Router();

Router.route("/")
  .get(userController.getAllUsers)
  .post(userController.createUser);
Router.route("/:id")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

export default Router;
