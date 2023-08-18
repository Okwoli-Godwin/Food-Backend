import mongoose from "mongoose";
import { Iuser } from "../Interface/interface";

// creating User Model
//  👇👇
interface user extends Iuser, mongoose.Document {}

const userModel = new mongoose.Schema<Iuser>(
  {
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
    fullname: {
      type: String,
      required: [true, "name is required"],
    }
  },
  { timestamps: true }
);

export default mongoose.model<user>("FIWA(User)", userModel);
