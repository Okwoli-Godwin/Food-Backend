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
exports.deleteUser = exports.viewAllSearchedUsers = exports.viewAParticularUser = exports.viewAllRegisteredUsers = exports.userLogin = exports.createUser = void 0;
const asyncHander_1 = require("../error/asyncHander");
const bcrypt_1 = __importDefault(require("bcrypt"));
const errorSpellOut_1 = require("../error/errorSpellOut");
const userModel_1 = __importDefault(require("../Model/userModel"));
exports.createUser = (0, asyncHander_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const salt = yield bcrypt_1.default.genSalt(10);
    const hash = yield bcrypt_1.default.hash(password, salt);
    const checkIfUserExist = yield userModel_1.default.findOne({ email });
    if (checkIfUserExist) {
        return next(new errorSpellOut_1.AppError({
            message: "Can't Use An Existing Email ❌❌",
            httpCode: errorSpellOut_1.HttpCode.BAD_REQUEST,
        }));
    }
    const register = yield userModel_1.default.create({
        email,
        password: hash,
    });
    return res.status(errorSpellOut_1.HttpCode.CREATED).json({
        message: "user created",
        data: register,
    });
}));
exports.userLogin = (0, asyncHander_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body; // body
    const checkIfUserExist = yield userModel_1.default.findOne({ email });
    if (!checkIfUserExist) {
        return next(new errorSpellOut_1.AppError({
            message: "Email or password not correct",
            httpCode: errorSpellOut_1.HttpCode.BAD_REQUEST,
        }));
    }
    const CheckPassword = yield bcrypt_1.default.compare(password, checkIfUserExist === null || checkIfUserExist === void 0 ? void 0 : checkIfUserExist.password);
    if (!CheckPassword) {
        return next(new errorSpellOut_1.AppError({
            message: "Email or password not correct",
            httpCode: errorSpellOut_1.HttpCode.BAD_REQUEST,
        }));
    }
    return res.status(errorSpellOut_1.HttpCode.OK).json({
        message: "Sign In",
        data: checkIfUserExist,
    }); // Sign In
}));
const viewAllRegisteredUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getAllUsers = yield userModel_1.default.find();
        if (getAllUsers.length === 0) {
            return res.status(errorSpellOut_1.HttpCode.OK).json({
                message: "No user Avaliable",
            });
        }
        return res.status(errorSpellOut_1.HttpCode.OK).json({
            length: getAllUsers === null || getAllUsers === void 0 ? void 0 : getAllUsers.length,
            message: "Successfully Gotten All Users",
            data: getAllUsers,
        });
    }
    catch (error) {
        return res.status(errorSpellOut_1.HttpCode.INTERNAL_SERVER_ERROR).json({
            message: "An Error Occured in viewAllRegisteredUsers",
            error: error,
        });
    }
});
exports.viewAllRegisteredUsers = viewAllRegisteredUsers;
const viewAParticularUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getOneUser = yield userModel_1.default.findById(req.params.userID);
        return res.status(errorSpellOut_1.HttpCode.OK).json({
            message: "Successfully One User",
            data: getOneUser,
        });
    }
    catch (error) {
        if ((error === null || error === void 0 ? void 0 : error.name) === "CastError") {
            return res.status(errorSpellOut_1.HttpCode.NOT_FOUND).json({
                message: "Could'nt Get User....Check ID",
            });
        }
        return res.status(errorSpellOut_1.HttpCode.INTERNAL_SERVER_ERROR).json({
            message: "An Error Occured in viewAParticularUser",
            error: error,
        });
    }
});
exports.viewAParticularUser = viewAParticularUser;
const viewAllSearchedUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const searchQuery = req.query;
        const findTheSearch = yield userModel_1.default.find(searchQuery);
        if (findTheSearch.length === 0) {
            return res.status(errorSpellOut_1.HttpCode.NOT_FOUND).json({
                message: `No results found for search`,
            });
        }
        return res.status(errorSpellOut_1.HttpCode.OK).json({
            length: findTheSearch.length,
            message: "Successfully retrieved matching users",
            data: findTheSearch,
        });
    }
    catch (error) {
        return res.status(errorSpellOut_1.HttpCode.INTERNAL_SERVER_ERROR).json({
            message: "An error occurred while searching for users",
            error: error,
        });
    }
});
exports.viewAllSearchedUsers = viewAllSearchedUsers;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        const deleteUser = yield userModel_1.default.findByIdAndDelete(userID);
        return res.status(errorSpellOut_1.HttpCode.OK).json({
            message: "user deleted",
        });
    }
    catch (error) {
        return res.status(errorSpellOut_1.HttpCode.INTERNAL_SERVER_ERROR).json({
            message: "An error occurred in deleteUser",
            error: error,
        });
    }
});
exports.deleteUser = deleteUser;
