import { NextFunction, Request, Response } from "express";
import CreateError from "../utils/error";
import { prisma } from "../db";

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await prisma.user.findMany({
      where: {
        role: { not: "Admin" },
      },
    });
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

const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    if (!user) return next(new CreateError(404, "Invalid Id"));
    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (err) {
    next(err);
  }
};

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { role } = req.body;
    const userId = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    if (!userId) return next(new CreateError(404, "Invalid ID"));

    const user = await prisma.user.update({
      where: {
        id: id,
      },
      data: { role },
    });

    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (err) {
    next(err);
  }
};

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const userId = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    if (!userId) return next(new CreateError(404, "Invalid ID"));

    await prisma.user.delete({
      where: {
        id: id,
      },
    });
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    next(err);
  }
};

export default { getAllUsers, createUser, getUser, updateUser, deleteUser };
