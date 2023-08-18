import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import { AppError, HttpCode } from "./error/errorSpellOut";
import { errorHandler } from "./error/errorHandler/errorHandler";
import UserRoute from "./Routes/userRoute";
import restauarantRoutes from "./Routes/ResRoutes";
import RecipeRoute from "./Routes/recipeRoutes";
import AdminRoute from "./Routes/adminRoute";

export const ApplicationCofig = (app: Application) => {
  app
    .use(express.json())
    .use(cors())
    .use(morgan("dev")) // middleware Configuration
    .get("/", (req: Request, res: Response) => {
      return res.status(200).json({
        message: "Api is up an Runing ❗✔🚴‍♀️🚴‍♀️",
      }); // default route
    })
    // user route 👇
    .use("/api/user", UserRoute)
    .use("/api/restauarant", restauarantRoutes)
    .use("/api/recipes", RecipeRoute)
    .use("/api/admin", AdminRoute)

    .all("*", (req: Request, res: Response, next: NextFunction) => {
      next(
        new AppError({
          message: `Opps!! Are You Lost??...This Route ${req.originalUrl} is Not Round`,
          httpCode: HttpCode.NOT_FOUND,
        })
      ); // 404 Routes
    });

  app.use(errorHandler);
};
