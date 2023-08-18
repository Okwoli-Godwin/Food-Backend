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
exports.viewAllSearchedRestaurant = exports.restauarantReg = void 0;
const express_1 = __importDefault(require("express"));
const asyncHander_1 = require("../error/asyncHander");
const errorSpellOut_1 = require("../error/errorSpellOut");
const restaurantModel_1 = __importDefault(require("../Model/restaurantModel"));
const axios_1 = __importDefault(require("axios"));
const one_sdk_1 = require("@superfaceai/one-sdk");
//checking for location using ipfy
const app = (0, express_1.default)();
app.set("trust proxy", true);
const sdk = new one_sdk_1.SuperfaceClient();
function run(ip) {
    return __awaiter(this, void 0, void 0, function* () {
        // Load the profile
        const profile = yield sdk.getProfile("address/ip-geolocation@1.0.1");
        // Use the profile
        const result = yield profile.getUseCase("IpGeolocation").perform({
            //   ipAddress: "102.88.34.40",
            ipAddress: ip,
        }, {
            provider: "ipdata",
            security: {
                apikey: {
                    apikey: "41b7b0ed377c175c4b32091abd68d049f5b6b748b2bee4789a161d93",
                },
            },
        });
        // Handle the result
        try {
            const data = result.unwrap();
            return data;
        }
        catch (error) {
            console.error(error);
        }
    });
}
//register a restauarant
exports.restauarantReg = (0, asyncHander_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { nameOfRestaurants, location } = req.body; // body
    const checkIfrestauarantExist = yield restaurantModel_1.default.findOne({
        nameOfRestaurants,
    });
    if (checkIfrestauarantExist) {
        // verifyUser(register);
        next(new errorSpellOut_1.AppError({
            message: "Can't Use An Existing Restaurant's name ❌❌",
            httpCode: errorSpellOut_1.HttpCode.BAD_REQUEST,
        }));
    }
    let dataIP;
    yield axios_1.default.get("https://api.ipify.org/").then((res) => {
        dataIP = res.data;
    });
    let realData = yield run(dataIP);
    const register = yield restaurantModel_1.default.create({
        nameOfRestaurants,
        location,
        latitude: realData === null || realData === void 0 ? void 0 : realData.latitude,
        longitude: realData === null || realData === void 0 ? void 0 : realData.longitude,
    });
    return res.status(errorSpellOut_1.HttpCode.CREATED).json({
        message: "Restaurant created",
        data: register,
        realData,
    }); // Creating Restaurant
}));
const viewAllSearchedRestaurant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const searchQuery = req.query;
        const findTheSearch = yield restaurantModel_1.default.find(searchQuery);
        if (findTheSearch.length === 0) {
            return res.status(errorSpellOut_1.HttpCode.NOT_FOUND).json({
                message: `No results found for search`,
            });
        }
        return res.status(errorSpellOut_1.HttpCode.OK).json({
            length: findTheSearch.length,
            message: "Successfully retrieved matching restaurants",
            data: findTheSearch,
        });
    }
    catch (error) {
        return res.status(errorSpellOut_1.HttpCode.INTERNAL_SERVER_ERROR).json({
            message: "An error occurred while searching for restaurants",
            error: error,
        });
    }
});
exports.viewAllSearchedRestaurant = viewAllSearchedRestaurant;
