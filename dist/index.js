"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const DataBase_1 = require("./config/DataBase");
const app_1 = require("./app");
// import { ApplicationCofig } from "./app";
// import dbConfig from "./Config/dataBase";
const app = (0, express_1.default)();
let port = 2001; // port number
(0, app_1.ApplicationCofig)(app);
(0, DataBase_1.DBCONNECTION)();
// ApplicationCofig(app);
// dbConfig();
process.on("uncaughtException", (error) => {
    console.log("stop here: uncaughtException");
    console.log(error);
    process.exit(1);
});
process.on("unhandledRejection", (reason) => {
    console.log("stop here: unhandledRejection");
    console.log(reason);
    process.exit(1);
});
app.listen(port, () => {
    console.log("Done on port", port);
});
