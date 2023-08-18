import { Router } from "express";
import {  restauarantReg} from "../controller/RestaurantsController";
const restauarantRoutes = Router();

restauarantRoutes.route("/reg-restaurant").post(restauarantReg)

export default restauarantRoutes