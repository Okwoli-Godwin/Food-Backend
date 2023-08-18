import nodemailer from "nodemailer";
import ejs from "ejs";
import path from "path";
import { google } from "googleapis";

const clientId =
  "24372524741-jn16e1i5tcijldtr4ipcn55rtje4am4j.apps.googleusercontent.com";
const clientSecret = "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";
const refreshToken =
  "1//04GUtuw7JeuxYCgYIARAAGAQSNwF-L9IroTMvzhkr6oNRxm63Cima8oRzQU4tIsivTj9EPBmDL9qUatQODhDhkP0qbP4qut3HUdE";

const GOOGLE_REDIRECT = "https://developers.google.com/oauthplayground";

const oAuth = new google.auth.OAuth2(clientId, clientSecret, GOOGLE_REDIRECT);
oAuth.setCredentials({ refresh_token: refreshToken });

export const VerifyAccount = async (user: any) => {
  const accessToken: any = (await oAuth.getAccessToken()).token;

  const transport = nodemailer.createTransport({
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

  const loadFile = path.join(__dirname, "../views/User/UserWelcomeEmail.ejs");

  const ReadUserData = await ejs.renderFile(loadFile, {
    name: user.name,
  });

  const mailOptions = {
    from: "Food Restaurants <nicsylvia15f@gmail.com>",
    to: user?.email,
    subject: "Account Verification",
    html: ReadUserData,
  };

  transport.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};
