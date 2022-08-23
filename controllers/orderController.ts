import { NextFunction, Request, Response } from "express";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order = await prisma.order.create({ data: req.body });
    res.status(200).json({
      status: "success",
      data: {
        order,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

const getOrders = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orders = await prisma.user.findMany({});
    res.status(200).json({
      status: "success",
      data: {
        orders,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

export default { createOrder, getOrders };
