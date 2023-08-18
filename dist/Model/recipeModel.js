"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const recipeModel = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: [true, "title is Required"],
    },
    nutritions: {
        type: String,
        required: [true, "nutrition is Required"],
    },
    foodImg: {
        type: String,
        required: [true, "foodImg is Required"],
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model("FIWA(recipe)", recipeModel);
