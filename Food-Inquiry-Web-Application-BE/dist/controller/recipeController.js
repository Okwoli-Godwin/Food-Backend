"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.viewAllSearchedRecipes = exports.viewAParticularRecipe = exports.CreateRecipe = void 0;
const asyncHander_1 = require("../error/asyncHander");
const errorSpellOut_1 = require("../error/errorSpellOut");
const recipeModel_1 = __importDefault(require("../Model/recipeModel"));
const cloudinary_1 = __importDefault(require("../config/cloudinary"));
exports.CreateRecipe = (0, asyncHander_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { nutritions, title } = req.body; // body
    const cloudImg = yield ((_a = cloudinary_1.default.uploader) === null || _a === void 0 ? void 0 : _a.upload(req === null || req === void 0 ? void 0 : req.file.path));
    const createRecipe = yield recipeModel_1.default.create({
        nutritions,
        title,
        foodImg: cloudImg === null || cloudImg === void 0 ? void 0 : cloudImg.secure_url,
    });
    if (!createRecipe) {
        return next(new errorSpellOut_1.AppError({
            message: "couldn't create recipe❌❌",
            httpCode: errorSpellOut_1.HttpCode.BAD_REQUEST,
        }));
    }
    return res.status(errorSpellOut_1.HttpCode.CREATED).json({
        message: "Recipe created",
        data: createRecipe,
    }); // Creating Recipe
}));
const viewAParticularRecipe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getOneRecipe = yield recipeModel_1.default.findById(req.params.recipeId);
        return res.status(errorSpellOut_1.HttpCode.OK).json({
            message: "Successfully gotten a recipe",
            data: getOneRecipe,
        });
    }
    catch (error) {
        if ((error === null || error === void 0 ? void 0 : error.name) === "CastError") {
            return res.status(errorSpellOut_1.HttpCode.NOT_FOUND).json({
                message: "Could'nt Get OneRecipe....Check ID",
            });
        }
        return res.status(errorSpellOut_1.HttpCode.INTERNAL_SERVER_ERROR).json({
            message: "An Error Occured in viewAParticularRecipe",
            error: error,
        });
    }
});
exports.viewAParticularRecipe = viewAParticularRecipe;
const viewAllSearchedRecipes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const searchQuery = req.query;
        const findTheSearch = yield recipeModel_1.default.find(searchQuery);
        if (findTheSearch.length === 0) {
            return res.status(errorSpellOut_1.HttpCode.NOT_FOUND).json({
                message: `No results found for search`,
            });
        }
        return res.status(errorSpellOut_1.HttpCode.OK).json({
            length: findTheSearch.length,
            message: "Successfully retrieved matching recipes",
            data: findTheSearch,
        });
    }
    catch (error) {
        return res.status(errorSpellOut_1.HttpCode.INTERNAL_SERVER_ERROR).json({
            message: "An error occurred while searching for recipes",
            error: error,
        });
    }
});
exports.viewAllSearchedRecipes = viewAllSearchedRecipes;
