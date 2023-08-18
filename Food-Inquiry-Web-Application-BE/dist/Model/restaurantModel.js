"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const RestaurantsModel = new mongoose_1.default.Schema({
    nameOfRestaurants: {
        type: String,
        required: true,
        unique: true,
    },
    location: {
        type: String,
        required: true
    },
    latitude: {
        type: String,
    },
    longitude: {
        type: String,
    },
    availableMeals: {
        type: []
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model("FIWA(Restaurants)", RestaurantsModel);
