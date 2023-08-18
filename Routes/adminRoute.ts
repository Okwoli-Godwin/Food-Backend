import { Router } from "express";
import {
  AdminLogin,
  createAdmin,
  deleteAdmin,
} from "../controller/adminController";
const AdminRoute = Router();

AdminRoute.route("/createadmin").post(createAdmin);
AdminRoute.route("/adminlogin").post(AdminLogin);
AdminRoute.route("/deleteadmin/:adminID").delete(deleteAdmin);

export default AdminRoute;
