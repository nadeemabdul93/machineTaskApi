/** @format */

import express from "express";
import { loginAuth } from "../../helper/common/auth.js";
import {
    addTask,
    deleteTaskById,
    getTaskById,
    getTaskList,
    updateTaskById

} from "./controller.js";
const router = express.Router();
import validate from "../../helper/common/validator.js";
import checkToken from "../../helper/common/JWT.middleware.js";


// routes
router.post("/", checkToken, validate("taskForm"),addTask);
router.get("/:id",checkToken,getTaskById);
router.get("/", checkToken,getTaskList);
router.put("/:id?", checkToken, validate("taskForm"), updateTaskById );
router.delete("/:id?", checkToken, deleteTaskById);


export default router;