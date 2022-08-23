import { Request, Response } from "express";
const getAllUsers = (req: Request, res: Response) => {
  res.status(500).json({
    status: "error",
    message: "Route is not Defined",
  });
};

const createUser = (req: Request, res: Response) => {
  res.status(500).json({
    status: "error",
    message: "Route is not Defined",
  });
};

const getUser = (req: Request, res: Response) => {
  res.status(500).json({
    status: "error",
    message: "Route is not Defined",
  });
};

const updateUser = (req: Request, res: Response) => {
  res.status(500).json({
    status: "error",
    message: "Route is not Defined",
  });
};

const deleteUser = (req: Request, res: Response) => {
  res.status(500).json({
    status: "error",
    message: "Route is not Defined",
  });
};

export default { getAllUsers, createUser, getUser, updateUser, deleteUser };
