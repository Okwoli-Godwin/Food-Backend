import express, { NextFunction, Request, Response, response } from "express";
import { asyncHandler } from "../error/asyncHander";
import { AppError, HttpCode } from "../error/errorSpellOut";
import recipeModel from "../Model/recipeModel";
import cloudinary from "../config/cloudinary";

export const CreateRecipe = asyncHandler(
  async (req: any, res: Response, next: NextFunction) => {
    const { nutritions, title } = req.body; // body

    const cloudImg = await cloudinary.uploader?.upload(req?.file!.path);

    const createRecipe = await recipeModel.create({
      nutritions,
      title,
      foodImg: cloudImg?.secure_url,
    });
    if (!createRecipe) {
      return next(
        new AppError({
          message: "couldn't create recipe❌❌",
          httpCode: HttpCode.BAD_REQUEST,
        })
      );
    }
    return res.status(HttpCode.CREATED).json({
      message: "Recipe created",
      data: createRecipe,
    }); // Creating Recipe
  }
);

export const viewAParticularRecipe = async (req: Request, res: Response) => {
  try {
    const getOneRecipe = await recipeModel.findById(req.params.recipeId);

    return res.status(HttpCode.OK).json({
      message: "Successfully gotten a recipe",
      data: getOneRecipe,
    });
  } catch (error: any) {
    if (error?.name === "CastError") {
      return res.status(HttpCode.NOT_FOUND).json({
        message: "Could'nt Get OneRecipe....Check ID",
      });
    }
    return res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
      message: "An Error Occured in viewAParticularRecipe",
      error: error,
    });
  }
};

export const viewAllSearchedRecipes = async (req: Request, res: Response) => {
  try {
    const searchQuery = req.query;
    const findTheSearch = await recipeModel.find(searchQuery!);

    if (findTheSearch.length === 0) {
      return res.status(HttpCode.NOT_FOUND).json({
        message: `No results found for search`,
      });
    }

    return res.status(HttpCode.OK).json({
      length: findTheSearch.length,
      message: "Successfully retrieved matching recipes",
      data: findTheSearch,
    });
  } catch (error) {
    return res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
      message: "An error occurred while searching for recipes",
      error: error,
    });
  }
};
