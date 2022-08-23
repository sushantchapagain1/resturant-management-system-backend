import { NextFunction, Request, Response } from "express";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const category = await prisma.category.create({
      data: req.body,
    });

    res.status(200).json({
      status: "success",
      data: category,
    });
  } catch (err) {
    console.log(err);
  }
};

const getCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const categories = await prisma.category.findMany({});
    res.status(200).json({
      status: "success",
      data: {
        categories,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

export default { createCategory, getCategory };
