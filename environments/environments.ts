import dotenv from "dotenv";

dotenv.config();

const environmentVarabiles = {
  mongodbLocalUrl: process.env.mongodbLocalUrl as string,
  mongodbRemoteUrl: process.env.mongodbRemoteUrl as string,
};

export default environmentVarabiles;
