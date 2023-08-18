import express, { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../error/asyncHander";
import bcrypt from "bcrypt";
import { AppError, HttpCode } from "../error/errorSpellOut";
import restaurantModel from "../Model/restaurantModel";
import ip from "ip";
import axios from "axios";
import { SuperfaceClient } from "@superfaceai/one-sdk";

//checking for location using ipfy

const app = express();
app.set("trust proxy", true);

const sdk = new SuperfaceClient();

async function run(ip: any) {
  // Load the profile
  const profile = await sdk.getProfile("address/ip-geolocation@1.0.1");

  // Use the profile
  const result = await profile.getUseCase("IpGeolocation").perform(
    {
      //   ipAddress: "102.88.34.40",
      ipAddress: ip,
    },
    {
      provider: "ipdata",
      security: {
        apikey: {
          apikey: "41b7b0ed377c175c4b32091abd68d049f5b6b748b2bee4789a161d93",
        },
      },
    }
  );

  // Handle the result
  try {
    const data = result.unwrap();
    return data;
  } catch (error) {
    console.error(error);
  }
}

//register a restauarant
export const restauarantReg = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { nameOfRestaurants, location } = req.body; // body

    const checkIfrestauarantExist = await restaurantModel.findOne({
      nameOfRestaurants,
    });
    if (checkIfrestauarantExist) {
      // verifyUser(register);
      next(
        new AppError({
          message: "Can't Use An Existing Restaurant's name ❌❌",
          httpCode: HttpCode.BAD_REQUEST,
        })
      );
    }

    let dataIP: any;

    await axios.get("https://api.ipify.org/").then((res: any) => {
      dataIP = res.data;
    });

    let realData: any = await run(dataIP);

    const register = await restaurantModel.create({
      nameOfRestaurants,
      location,
      latitude: realData?.latitude,
      longitude: realData?.longitude,
    });

    return res.status(HttpCode.CREATED).json({
      message: "Restaurant created",
      data: register,
      realData,
    }); // Creating Restaurant
  }
);

export const viewAllSearchedRestaurant = async (
  req: Request,
  res: Response
) => {
  try {
    const searchQuery = req.query;
    const findTheSearch = await restaurantModel.find(searchQuery!);

    if (findTheSearch.length === 0) {
      return res.status(HttpCode.NOT_FOUND).json({
        message: `No results found for search`,
      });
    }

    return res.status(HttpCode.OK).json({
      length: findTheSearch.length,
      message: "Successfully retrieved matching restaurants",
      data: findTheSearch,
    });
  } catch (error) {
    return res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
      message: "An error occurred while searching for restaurants",
      error: error,
    });
  }
};
