import { NextFunction, Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.body;
    const uuid: string = uuidv4();
    const category = await prisma.category.create({
      data: { id: uuid, ...req.body },
    });

    res.status(200).json({
      status: "success",
      data: category,
    });
  } catch (err) {
    next(err);
  }
};

const getAllCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categories = await prisma.category.findMany({});
    res.status(200).json({
      status: "success",
      data: {
        categories,
      },
    });
  } catch (err) {
    next(err);
  }
};

const getCategory = (req: Request, res: Response, next: NextFunction) => {};
const updateCategory = (req: Request, res: Response, next: NextFunction) => {};
const deleteCategory = (req: Request, res: Response, next: NextFunction) => {};

export default {
  createCategory,
  getAllCategory,
  getCategory,
  updateCategory,
  deleteCategory,
};
