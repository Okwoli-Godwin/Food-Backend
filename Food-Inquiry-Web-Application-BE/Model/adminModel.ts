import mongoose from "mongoose";
import { IAdmin } from "../Interface/interface";

// creating Admin Model
//  👇👇
interface admin extends IAdmin, mongoose.Document {}

const AdminModel = new mongoose.Schema<IAdmin>(
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
  },
  { timestamps: true }
);

export default mongoose.model<admin>("FIWA(admin)", AdminModel);
