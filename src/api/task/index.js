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
router.post("/", validate("taskForm"),addTask);
router.get("/:id",getTaskById);
router.get("/",getTaskList);

router.put("/:id?", validate("taskForm"), updateTaskById );
router.delete("/:id?", deleteTaskById);
// router.post("/tasks", loginAuth, addtask);



export default router;