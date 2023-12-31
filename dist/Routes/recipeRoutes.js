"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const recipeController_1 = require("../controller/recipeController");
const multer_1 = require("../config/multer");
const RecipeRoute = (0, express_1.Router)();
RecipeRoute.route("/createrecipe").post(multer_1.Upload, recipeController_1.CreateRecipe);
RecipeRoute.route("/viewAllSearchedRecipes").get(recipeController_1.viewAllSearchedRecipes);
RecipeRoute.route("/viewAParticularRecipe/:recipeId").get(recipeController_1.viewAParticularRecipe);
exports.default = RecipeRoute;
