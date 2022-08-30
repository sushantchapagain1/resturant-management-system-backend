import { ErrorRequestHandler, NextFunction, Response } from "express";
import CreateError from "../utils/error";
const globalErrorHandler = (
  err: ErrorRequestHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err.name == "JsonWebTokenError")
    return next(new CreateError(401, "Invalid Token! Please Log in Again"));
};

export default globalErrorHandler;
