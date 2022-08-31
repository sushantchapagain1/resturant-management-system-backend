import CreateError from "../utils/error";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../db";

interface JwtPayload {
  id: string;
}
interface GetUserInfoRequest extends Request {
  user?: any;
}

const protect = async (
  req: GetUserInfoRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) return next(new CreateError(401, "You are not logged in!"));

    // verify token if token is manupulated or expired.
    const { id } = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;

    // check if user exists not deleted by admin or maybe user deleted his req.
    const currentUser = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    if (!currentUser)
      return next(
        new CreateError(401, "The user with this token no longer exits")
      );

    // sending data of user to req obj
    req.user = currentUser;
    next();
  } catch (err) {
    next(err);
  }
};

const allowTo = (...roles: string[]) => {
  return (req: GetUserInfoRequest, res: Response, next: NextFunction) => {
    // roles is now array so ['Admin','Manager'] and if not have 'other' than it is not allowded to access.
    if (!roles.includes(req.user.role)) {
      return next(
        new CreateError(403, "You do not have access to perform this action")
      );
    }
    next();
  };
};

export default { protect, allowTo };
