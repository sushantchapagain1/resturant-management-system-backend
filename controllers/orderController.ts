import { NextFunction, Request, Response } from "express";
import CreateError from "../utils/error";
import { v4 as uuidv4 } from "uuid";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.body;
    const uuid: string = uuidv4();

    const order = await prisma.order.create({
      data: { id: uuid, ...req.body },
    });
    res.status(200).json({
      status: "success",
      data: {
        order,
      },
    });
  } catch (err) {
    next(err);
  }
};

const getOrders = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orders = await prisma.order.findMany({});
    if (!orders)
      return next(new CreateError(404, "There are no any order currently"));
    res.status(200).json({
      status: "success",
      data: {
        orders,
      },
    });
  } catch (err) {
    next(err);
  }
};

const getOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const order = await prisma.order.findUnique({
      where: {
        id: id,
      },
    });
    if (!order) return next(new CreateError(404, "Invalid Id"));
    res.status(200).json({
      status: "success",
      data: {
        order,
      },
    });
  } catch (err) {
    next(err);
  }
};

const updateOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const orderId = await prisma.order.findUnique({
      where: {
        id: id,
      },
    });
    if (!orderId) return next(new CreateError(404, "Invalid ID"));

    const order = await prisma.order.update({
      where: {
        id: id,
      },
      data: req.body,
      include: { Product: true, User: true },
    });

    res.status(200).json({
      status: "success",
      data: {
        order,
      },
    });
  } catch (err) {
    next(err);
  }
};

const deleteOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const order = await prisma.order.delete({
      where: {
        id: id,
      },
    });
    if (!order) return next(new CreateError(404, "Invalid Id"));
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    next(err);
  }
};
export default { createOrder, getOrders, getOrder, updateOrder, deleteOrder };
