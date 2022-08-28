import { NextFunction, Request, Response } from "express";
import CreateError from "../utils/error";
import { v4 as uuidv4 } from "uuid";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.body;
    const uuid: string = uuidv4();

    const product = await prisma.product.create({
      data: { id: uuid, ...req.body },
    });
    res.status(200).json({
      status: "success",
      data: {
        product,
      },
    });
  } catch (err) {
    next(err);
  }
};

const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await prisma.product.findMany({});
    res.status(200).json({
      status: "success",
      data: {
        products,
      },
    });
  } catch (err) {
    next(err);
  }
};

const getProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.findUnique({
      where: {
        id: id,
      },
    });
    if (!product) return next(new CreateError(404, "Invalid Id"));
    res.status(200).json({
      status: "success",
      data: {
        product,
      },
    });
  } catch (err) {
    next(err);
  }
};

const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const productId = await prisma.product.findUnique({
      where: {
        id: id,
      },
    });
    if (!productId) return next(new CreateError(404, "Invalid ID"));

    const product = await prisma.product.update({
      where: {
        id: id,
      },
      data: req.body,
      include: { Category: true },
    });

    res.status(200).json({
      status: "success",
      data: {
        product,
      },
    });
  } catch (err) {
    next(err);
  }
};

const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const productId = await prisma.category.findUnique({
      where: {
        id: id,
      },
    });
    if (!productId) return next(new CreateError(404, "Invalid ID"));

    await prisma.product.delete({
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
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
};
