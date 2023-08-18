import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../error/asyncHander";
import bcrypt from "bcrypt";
import { AppError, HttpCode } from "../error/errorSpellOut";
import adminModel from "../Model/adminModel";

export const createAdmin = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const checkIfUserExist = await adminModel.findOne({ email });

    if (checkIfUserExist) {
      return next(
        new AppError({
          message: "Admin Already Exist",
          httpCode: HttpCode.BAD_REQUEST,
        })
      );
    }

    const register = await adminModel.create({
      email,
      password: hash,
    });

    return res.status(HttpCode.CREATED).json({
      message: "Admin created",
      data: register,
    });
  }
);

export const AdminLogin = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body; // body

    const checkIfAminExist = await adminModel.findOne({ email });
    if (!checkIfAminExist) {
      return next(
        new AppError({
          message: "Email or password not correct",
          httpCode: HttpCode.BAD_REQUEST,
        })
      );
    }
    const CheckPassword = await bcrypt.compare(
      password,
      checkIfAminExist?.password!
    );

    if (!CheckPassword) {
      return next(
        new AppError({
          message: "Email or password not correct",
          httpCode: HttpCode.BAD_REQUEST,
        })
      );
    }

    return res.status(HttpCode.OK).json({
      message: "Sign In",
      data: checkIfAminExist,
    }); // Sign In
  }
);

export const deleteAdmin = async (req: Request, res: Response) => {
  try {
    const { adminID } = req.params;
    const deleteAdmin = await adminModel.findByIdAndDelete(adminID);

    return res.status(HttpCode.OK).json({
      message: "Admin deleted",
    });
  } catch (error) {
    return res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
      message: "An error occurred in deleteAdmin",
      error: error,
    });
  }
};
