import express, {
  ErrorRequestHandler,
  Express,
  NextFunction,
  Request,
  Response,
} from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes";
import orderRoutes from "./routes/orderRoutes";
import productRoutes from "./routes/productRoutes";
import categoryRoutes from "./routes/categoryRoutes";
import CreateError from "./utils/error";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

app.get("/", async (req: Request, res: Response, next: NextFunction) => {
  res.send({ message: "Awesome it works 🐻" });
});

app.use("/api/category", categoryRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  if (err.name == "JsonWebTokenError")
    return res.status(401).json({
      sucess: "fail",
      status: 401,
      message: "Invalid Id Please Log in Again",
    });
  if (err.name == "TokenExpiredError")
    return res.status(401).json({
      sucess: "fail",
      status: 401,
      message: "Token Expired Please Log in Again",
    });
  return res.status(errorStatus).json({
    success: "fail",
    status: errorStatus,
    message: errorMessage,
    err,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 @ http://localhost:${PORT}`));
