import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import CreateError from "../utils/error";

import { prisma } from "../db";

dotenv.config();

const signToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRY_TIME,
  });
};

type cookieOptionsType = {
  expires: Date;
  httpOnly: boolean;
  secure?: boolean;
};

const sendCookieToken = (user: any, statusCode: number, res: Response) => {
  const token = signToken(user.id);
  const convertToMiliSecond = 24 * 60 * 60 * 1000;
  const cookieOptions: cookieOptionsType = {
    expires: new Date(
      Date.now() +
        Number(process.env.JWT_COOKIE_EXPIRY_TIME) * convertToMiliSecond
    ),
    // TODO
    // secure: true, //works only on encrpted connections https
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

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
    const { name, email, password } = req.body;
    if (!email || !password || !name)
      return next(new CreateError(400, "Please provide all data"));
    const existingUser = await prisma.user.findUnique({
      where: {
        email: req.body.email,
      },
    });
    if (existingUser) return next(new CreateError(400, "Email already exists"));

    const salt = await bcrypt.genSalt(10);
    const securedPass = await bcrypt.hash(req.body.password, salt);

    const user = await prisma.user.create({
      data: {
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
      return next(new CreateError(400, "Please provide email and password"));

    const user = await prisma.user.findUnique({
      where: {
        email: req.body.email,
      },
    });
    if (!user)
      return next(new CreateError(400, "email or password donot match"));

    const isCorrect = await bcrypt.compare(password, user.password);
    if (!isCorrect)
      return next(new CreateError(404, "email or password donot match"));

    sendCookieToken(user, 200, res);
  } catch (err) {
    next(err);
  }
};

const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const expireTime = new Date(Date.now() + 5 * 1000);
    res.cookie("jwt_cookie", "loggedout", {
      expires: expireTime,
      httpOnly: true,
    });
    return res.status(200).json({ status: "success" });
  } catch (err) {
    next(err);
  }
};

export default { signup, login, logout };
