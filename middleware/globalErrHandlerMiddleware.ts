import { NextFunction, Request, Response } from "express";

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  if (err.name === "JsonWebTokenError")
    return res.status(401).json({
      sucess: "fail",
      status: 401,
      message: "Invalid Token Please Log in Again",
    });
  if (err.name === "TokenExpiredError")
    return res.status(401).json({
      sucess: "fail",
      status: 401,
      message: "Token Expired Please Log in Again",
    });
  return res.status(errorStatus).json({
    success: "fail",
    status: errorStatus,
    message: errorMessage,
    err,
  });
};

export default globalErrorHandler;
