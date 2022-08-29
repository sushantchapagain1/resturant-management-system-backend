import { NextFunction, Request, Response } from "express";
import { prisma } from "../db";
const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await prisma.user.findMany({});
    res.status(200).json({
      status: "success",
      data: {
        users,
      },
    });
  } catch (err) {
    next(err);
  }
};

const createUser = (req: Request, res: Response) => {
  res.status(500).json({
    status: "error",
    message: "Route is not Defined",
  });
};

const getUser = (req: Request, res: Response) => {
  res.status(500).json({
    status: "error",
    message: "Route is not Defined",
  });
};

const updateUser = (req: Request, res: Response) => {
  res.status(500).json({
    status: "error",
    message: "Route is not Defined",
  });
};

const deleteUser = (req: Request, res: Response) => {
  res.status(500).json({
    status: "error",
    message: "Route is not Defined",
  });
};

export default { getAllUsers, createUser, getUser, updateUser, deleteUser };
