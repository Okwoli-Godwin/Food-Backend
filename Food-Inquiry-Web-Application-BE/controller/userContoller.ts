import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../error/asyncHander";
import bcrypt from "bcrypt";
import { AppError, HttpCode } from "../error/errorSpellOut";
import userModel from "../Model/userModel";


export const createUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const checkIfUserExist = await userModel.findOne({ email });

    if (checkIfUserExist) {
      return next(
        new AppError({
          message: "Can't Use An Existing Email ❌❌",
          httpCode: HttpCode.BAD_REQUEST,
        })
      );
    }

    const register = await userModel.create({
      email,
      password: hash,
    });

    return res.status(HttpCode.CREATED).json({
      message: "user created",
      data: register,
    });
  }
);

export const userLogin = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body; // body

    const checkIfUserExist = await userModel.findOne({ email });
    if (!checkIfUserExist) {
      return next(
        new AppError({
          message: "Email or password not correct",
          httpCode: HttpCode.BAD_REQUEST,
        })
      );
    }
    const CheckPassword = await bcrypt.compare(
      password,
      checkIfUserExist?.password!
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
      data: checkIfUserExist,
    }); // Sign In
  }
);

export const viewAllRegisteredUsers = async (req: Request, res: Response) => {
  try {
    const getAllUsers = await userModel.find();
    if (getAllUsers.length === 0) {
      return res.status(HttpCode.OK).json({
        message: "No user Avaliable",
      });
    }

    return res.status(HttpCode.OK).json({
      length: getAllUsers?.length,
      message: "Successfully Gotten All Users",
      data: getAllUsers,
    });
  } catch (error) {
    return res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
      message: "An Error Occured in viewAllRegisteredUsers",
      error: error,
    });
  }
};

export const viewAParticularUser = async (req: Request, res: Response) => {
  try {
    const getOneUser = await userModel.findById(req.params.userID);

    return res.status(HttpCode.OK).json({
      message: "Successfully One User",
      data: getOneUser,
    });
  } catch (error: any) {
    if (error?.name === "CastError") {
      return res.status(HttpCode.NOT_FOUND).json({
        message: "Could'nt Get User....Check ID",
      });
    }
    return res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
      message: "An Error Occured in viewAParticularUser",
      error: error,
    });
  }
};

export const viewAllSearchedUsers = async (req: Request, res: Response) => {
  try {
    const searchQuery = req.query;
    const findTheSearch = await userModel.find(searchQuery!);

    if (findTheSearch.length === 0) {
      return res.status(HttpCode.NOT_FOUND).json({
        message: `No results found for search`,
      });
    }

    return res.status(HttpCode.OK).json({
      length: findTheSearch.length,
      message: "Successfully retrieved matching users",
      data: findTheSearch,
    });
  } catch (error) {
    return res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
      message: "An error occurred while searching for users",
      error: error,
    });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;
    const deleteUser = await userModel.findByIdAndDelete(userID);

    return res.status(HttpCode.OK).json({
      message: "user deleted",
    });
  } catch (error) {
    return res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
      message: "An error occurred in deleteUser",
      error: error,
    });
  }
};
