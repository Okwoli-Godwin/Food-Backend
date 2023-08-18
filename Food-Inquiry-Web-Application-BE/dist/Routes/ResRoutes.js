"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const RestaurantsController_1 = require("../controller/RestaurantsController");
const restauarantRoutes = (0, express_1.Router)();
restauarantRoutes.route("/reg-restaurant").post(RestaurantsController_1.restauarantReg);
exports.default = restauarantRoutes;
