/** @format */

import express from "express";
import { loginAuth } from "../../helper/common/auth.js";
import {
    getProfileDetails,
    login,
    register,
    updateProfile,
    userLogOut,

} from "./controller.js";
const router = express.Router();
import validate from "../../helper/common/validator.js";
import checkToken from "../../helper/common/JWT.middleware.js";

// routes
router.post("/register", loginAuth, register);
router.post("/login", loginAuth, login);
router.get("/profile", checkToken, getProfileDetails);
router.put("/updateProfile", checkToken, updateProfile);
router.get("/logout", checkToken, userLogOut);

export default router;