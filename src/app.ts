import express, { Application, NextFunction, Request, Response } from "express";
const app: Application = express();
import cors from "cors";
import { UserRoutes } from "./app/modules/user/user.route";
import { carRoutes } from "./app/modules/car/car.route";
import globalErrorHandler from "./app/modules/middleware/globalErrorHandler";
import { bookingRoutes } from "./app/modules/booking/booking.route";
import { authRoutes } from "./app/modules/auth/auth.route";
const port = 3000;

//parser
app.use(express.json());
app.use(cors());

app.use("/api", UserRoutes);
app.use("/api", authRoutes);
app.use("/api", carRoutes);
app.use("/api", bookingRoutes);

app.get("/", (req: Request, res: Response) => {
  var a = 10;
  res.send("Hello World!");
});

app.use(globalErrorHandler);
// app.use((req: Request, res: Response, next: NextFunction) => {
//   // res.status(404).send('404 Not Found')
//   res.status(404).json({
//     success: false,
//     message: "Not found",
//   });
// });

export default app;
