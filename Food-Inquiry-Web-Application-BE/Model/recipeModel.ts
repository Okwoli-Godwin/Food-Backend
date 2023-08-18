import mongoose from "mongoose";
import { Iuser } from "../Interface/interface";

// creating User Model
//  👇👇

interface recipe {
  title: string;
  nutritions: string;
  foodImg: string;
}
interface Irecipe extends recipe, mongoose.Document {}

const recipeModel = new mongoose.Schema<recipe>(
  {
    title: {
      type: String,
      required: [true, "title is Required"],
    },
    nutritions: {
      type: String,
      required: [true, "nutrition is Required"],
    },
    foodImg: {
      type: String,
      required: [true, "foodImg is Required"],
    },
  },
  { timestamps: true }
);

export default mongoose.model<Irecipe>("FIWA(recipe)", recipeModel);
