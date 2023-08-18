"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userModel = new mongoose_1.default.Schema({
    email: {
        type: String,
        required: [true, "Email is Required"],
        lowercase: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Password is Required"],
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model("FIWA(User)", userModel);
