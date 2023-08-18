import { Router } from "express";
import {
  CreateRecipe,
  viewAParticularRecipe,
  viewAllSearchedRecipes,
} from "../controller/recipeController";
import { Upload } from "../config/multer";
const RecipeRoute = Router();

RecipeRoute.route("/createrecipe").post(Upload, CreateRecipe);
RecipeRoute.route("/viewAllSearchedRecipes").get(viewAllSearchedRecipes);
RecipeRoute.route("/viewAParticularRecipe/:recipeId").get(
  viewAParticularRecipe
);

export default RecipeRoute;
