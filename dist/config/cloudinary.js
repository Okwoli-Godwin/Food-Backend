"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = __importDefault(require("cloudinary"));
const cloudinary = cloudinary_1.default.v2;
cloudinary.config({
    cloud_name: "daqpb7odj",
    api_key: "579437147678149",
    api_secret: "982qH3ZlrqEkr91weQe2XQQo3jo",
    secure: true,
});
exports.default = cloudinary;
