"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const adminController_1 = require("../controller/adminController");
const AdminRoute = (0, express_1.Router)();
AdminRoute.route("/createadmin").post(adminController_1.createAdmin);
AdminRoute.route("/adminlogin").post(adminController_1.AdminLogin);
AdminRoute.route("/deleteadmin/:adminID").delete(adminController_1.deleteAdmin);
exports.default = AdminRoute;
