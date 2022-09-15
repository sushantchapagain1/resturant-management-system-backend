import { NextFunction, Request, Response } from "express";
import CreateError from "../utils/error";
import { prisma } from "../db";

const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = req.body;

    if (!name)
      return next(new CreateError(400, "Please provide name of the category"));

    const existingCategory = await prisma.category.findUnique({
      where: {
        name: req.body.name,
      },
    });

    if (existingCategory)
      return next(new CreateError(400, "Category already exists"));

    const category = await prisma.category.create({ data: { name } });

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

const getCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const category = await prisma.category.findUnique({
      where: {
        id: id,
      },
    });
    if (!category) return next(new CreateError(404, "Invalid Id"));
    res.status(200).json({
      status: "success",
      data: {
        category,
      },
    });
  } catch (err) {
    next(err);
  }
};
const updateCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const categoryId = await prisma.category.findUnique({
      where: {
        id: id,
      },
    });
    if (!categoryId) return next(new CreateError(404, "Invalid ID"));

    const existingCategory = await prisma.category.findUnique({
      where: {
        name: req.body.name,
      },
    });

    if (existingCategory)
      return next(
        new CreateError(400, "You have not still changed the category ")
      );

    const category = await prisma.category.update({
      where: {
        id: id,
      },
      data: req.body,
    });

    res.status(200).json({
      status: "success",
      data: {
        category,
      },
    });
  } catch (err) {
    next(err);
  }
};
const deleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const categoryId = await prisma.category.findUnique({
      where: {
        id: id,
      },
    });
    if (!categoryId) return next(new CreateError(404, "Invalid ID"));

    await prisma.category.delete({
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

export default {
  createCategory,
  getAllCategory,
  getCategory,
  updateCategory,
  deleteCategory,
};
