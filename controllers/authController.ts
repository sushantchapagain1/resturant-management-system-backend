import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";


dotenv.config({ path: "./config.env" });
const prisma = new PrismaClient();

const signToken = (id: string) => {
  return jwt.sign({ id }, `${process.env.JWT_SECRET}`, {
    expiresIn: process.env.JWT_EXPIRY_TIME,
  });
};

const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: req.body.email,
      },
    });
    if (existingUser)
      return res.status(400).json({ message: "Email already exists" });

    const salt = await bcrypt.genSalt(10);
    const securedPass = await bcrypt.hash(req.body.password, salt);
    const uuid: string = uuidv4();
    const { id, name, email, password } = req.body;

    const user = await prisma.user.create({
      data: {
        id: uuid,
        name,
        email,
        password: securedPass,
      },
    });
    const token = signToken(user.id);

    res.status(200).json({
      status: "success",
      token,
      data: {
        user,
      },
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export default { signup };
