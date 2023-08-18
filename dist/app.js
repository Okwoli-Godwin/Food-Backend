"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationCofig = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const errorSpellOut_1 = require("./error/errorSpellOut");
const errorHandler_1 = require("./error/errorHandler/errorHandler");
const userRoute_1 = __importDefault(require("./Routes/userRoute"));
const ResRoutes_1 = __importDefault(require("./Routes/ResRoutes"));
const recipeRoutes_1 = __importDefault(require("./Routes/recipeRoutes"));
const adminRoute_1 = __importDefault(require("./Routes/adminRoute"));
const ApplicationCofig = (app) => {
    app
        .use(express_1.default.json())
        .use((0, cors_1.default)())
        .use((0, morgan_1.default)("dev")) // middleware Configuration
        .get("/", (req, res) => {
        return res.status(200).json({
            message: "Api is up an Runing ❗✔🚴‍♀️🚴‍♀️",
        }); // default route
    })
        // user route 👇
        .use("/api/user", userRoute_1.default)
        .use("/api/restauarant", ResRoutes_1.default)
        .use("/api/recipes", recipeRoutes_1.default)
        .use("/api/admin", adminRoute_1.default)
        .all("*", (req, res, next) => {
        next(new errorSpellOut_1.AppError({
            message: `Opps!! Are You Lost??...This Route ${req.originalUrl} is Not Round`,
            httpCode: errorSpellOut_1.HttpCode.NOT_FOUND,
        })); // 404 Routes
    });
    app.use(errorHandler_1.errorHandler);
};
exports.ApplicationCofig = ApplicationCofig;
