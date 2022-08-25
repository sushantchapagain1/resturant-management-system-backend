import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import createError from "../utils/error";
dotenv.config({ path: "./config.env" });
const prisma = new PrismaClient();

const signToken = (id: string) => {
  return jwt.sign({ id }, `${process.env.JWT_SECRET}`, {
    expiresIn: process.env.JWT_EXPIRY_TIME,
  });
};

const sendCookieToken = (user: any, statusCode: number, res: Response) => {
  const token = signToken(user.id);

  const cookieOptions = {
    expires: new Date(
      Date.now() +
        Number(process.env.JWT_COOKIE_EXPIRY_TIME) * 24 * 60 * 60 * 1000 //converting to miliseconds
    ),
    // TODO
    // secure: true, //works only on encrpted connections https
    httpOnly: true,
  };

  res.cookie("jwt_cookie", token, cookieOptions);

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: req.body.email,
      },
    });
    if (existingUser) return next(createError("User already exists"));

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

    sendCookieToken(user, 200, res);
  } catch (err) {
    next(err);
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return next(createError("Please provide email and password"));

    const user = await prisma.user.findUnique({
      where: {
        email: req.body.email,
      },
    });
    if (!user) return next(createError("User not found till production"));

    const isCorrect = await bcrypt.compare(password, user.password);
    if (!isCorrect) return next(createError("email or password not correct"));

    sendCookieToken(user, 200, res);
  } catch (err) {
    next(err);
  }
};

export default { signup, login };
