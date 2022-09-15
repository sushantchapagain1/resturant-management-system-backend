import { NextFunction, Request, Response } from "express";
import CreateError from "../utils/error";

import { prisma } from "../db";

type productData = {
  name: string;
  price: number;
  categoryId: string;
};

const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, price, categoryId } = req.body;
    if (!name || !price || !categoryId)
      return next(new CreateError(400, "Please provide all data"));

    const product = await prisma.product.create({
      data: { name, price, categoryId } as productData,
    });

    res.status(200).json({
      status: "success",
      data: product,
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
    const productId = await prisma.product.findUnique({
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
