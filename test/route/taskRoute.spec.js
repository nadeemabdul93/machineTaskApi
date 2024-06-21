/** @format */

import express from "express";
import {
    addTask,
    getTaskList,

} from "../../src/api/task/controller.js";
const router = express.Router();
import validate from "../../src/helper/common/validator.js";
// routes
router.post("/",addTask);
router.get("/",getTaskList);



export default router;