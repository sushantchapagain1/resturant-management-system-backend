import express, { NextFunction, Request, Response } from "express";
const Router = express.Router();

Router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  res.send({ message: "Ok api is working 🚀" });
});

export default Router;
