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
exports.VerifyAccount = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const ejs_1 = __importDefault(require("ejs"));
const path_1 = __importDefault(require("path"));
const googleapis_1 = require("googleapis");
const clientId = "24372524741-jn16e1i5tcijldtr4ipcn55rtje4am4j.apps.googleusercontent.com";
const clientSecret = "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";
const refreshToken = "1//04GUtuw7JeuxYCgYIARAAGAQSNwF-L9IroTMvzhkr6oNRxm63Cima8oRzQU4tIsivTj9EPBmDL9qUatQODhDhkP0qbP4qut3HUdE";
const GOOGLE_REDIRECT = "https://developers.google.com/oauthplayground";
const oAuth = new googleapis_1.google.auth.OAuth2(clientId, clientSecret, GOOGLE_REDIRECT);
oAuth.setCredentials({ refresh_token: refreshToken });
const VerifyAccount = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const accessToken = (yield oAuth.getAccessToken()).token;
    const transport = nodemailer_1.default.createTransport({
        service: "gmail",
        auth: {
            type: "OAuth2",
            user: "nicsylvia15f@gmail.com",
            clientId: clientId,
            clientSecret: clientSecret,
            refreshToken: refreshToken,
            accessToken: accessToken,
        },
    });
    const loadFile = path_1.default.join(__dirname, "../views/User/UserWelcomeEmail.ejs");
    const ReadUserData = yield ejs_1.default.renderFile(loadFile, {
        name: user.name,
    });
    const mailOptions = {
        from: "Food Restaurants <nicsylvia15f@gmail.com>",
        to: user === null || user === void 0 ? void 0 : user.email,
        subject: "Account Verification",
        html: ReadUserData,
    };
    transport.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log("Error:", error);
        }
        else {
            console.log("Email sent:", info.response);
        }
    });
});
exports.VerifyAccount = VerifyAccount;
