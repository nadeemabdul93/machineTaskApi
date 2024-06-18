import logger from "../../../logger.js";
import { getString, taskStatus} from "../../helper/common/helper.js";
import bcrypt from "bcrypt";
import moment from "moment";
import { getJwtToken } from "../../helper/common/helper.js";
import { validationResult } from "express-validator";
import mongoose from "mongoose";
import config from "../../helper/envconfig/envVars.js";
import crypto from "crypto";
import fs from "fs";
import path from "path";
import taskSchemaModel from "../../model/taskSchema.js";
import jwt from "jsonwebtoken";
import taskResponse from "../../response/taskResponse.js";



export const addTask = async (req, res) => {
  try {
    const { title, description ,language } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.send({
        status: false,
        message: getString(language, errors.errors[0]["msg"]),
      });
    }
    let taskData=new taskSchemaModel ({
                title:title,
                description:description,
                status:taskStatus.active

    });

    const saveTask= await taskData.save();
    if(!saveTask  && saveTask == false){
        return res.send({
            status: false,
            // message: getString(language, "")
            message: getString(language, "taskNotSaved")
          });
    }

    return res.send({
        status: true,
       
        message: getString(language, "taskSaved")
      });
      
    
  } catch (err) {
    console.log("taskCreatedError", err);
    return res.send({
      status: false,
      message: err.message,
    });
  }
}
export const getTaskById = async (req, res) => {
    try {
      const { id, language } = req.params;
        // console.log("params",id);
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.send({
          status: false,
          message: getString(language, errors.errors[0]["msg"]),
        });
      }
      const checkTask =await taskSchemaModel.findById(id);
      if(!checkTask){
        return res.send({
            status: false,
            message: getString(language, "invalidTaskId")
          });
      }
        const getTask = await taskSchemaModel.findById(id).lean();

    
      if(!getTask  && getTask == null){
          return res.send({
              status: false,
              message: getString(language, "dataNotFound"),
              
            });
      }
  
      return res.send({
          status: true,         
          message: getString(language, "getTaskById"),
         data: getTask
        });
        
      
    } catch (err) {
      
      logger.info("getTaskError"+ err);
      return res.send({
        status: false,
        message: err.message,
      });
    }
}
export const getTaskList = async (req, res) => {
    try {
      const {language } = req.query;
    
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.send({
          status: false,
          message: getString(language, errors.errors[0]["msg"]),
        });
      }
      
        const getTask = await taskSchemaModel.find().lean();

    
      if(!getTask  && getTask == null){
          return res.send({
              status: false,
              message: getString(language, "dataNotFound"),
              
            });
      }
  
      return res.send({
          status: true,         
          message: getString(language, "getAllTaskList"),
         data: getTask
        });
        
      
    } catch (err) {
      
      logger.info("getTasklistError"+ err);
      return res.send({
        status: false,
        message: err.message,
      });
    }
}
export const updateTaskById = async (req, res) => {
    try {
      const { title, description ,status , language } = req.body;
      const { id } = req.params;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.send({
          status: false,
          message: getString(language, errors.errors[0]["msg"]),
        });
      }
      const checkTask =await taskSchemaModel.findById(id);
      if(!checkTask){
        return res.send({
            status: false,
            message: getString(language, "invalidTaskId")
          });
      }
      const updateTask =await taskSchemaModel.findByIdAndUpdate(id,
        {
          title: title,
          description: description,
          status: taskStatus.status,
        });
       
      if(!updateTask  && updateTask == null){
          return res.send({
              status: false,
              message: getString(language, "taskNotupdated")
            });
      }
  
      return res.send({
          status: true,         
          message: getString(language, "taskUpdated")
        });
        
      
    } catch (err) {
      logger.info("updateTaskError"+ err);
      return res.send({
        status: false,
        message: err.message,
      });
    }
}

export const deleteTaskById = async (req, res) => {
    try {
      const { language } = req.query;
      const { id } = req.params;
      console.log("id",id);
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.send({
          status: false,
          message: getString(language, errors.errors[0]["msg"]),
        });
      }
      const checkTask =await taskSchemaModel.findById(id);
      if(!checkTask){
        return res.send({
            status: false,
            message: getString(language, "invalidTaskId")
          });
      }
      const deleteTask =await taskSchemaModel.findByIdAndDelete(id);
    
      if(!deleteTask  && deleteTask == null){
          return res.send({
              status: false,
              message: getString(language, "taskNotDeleted")
            });
      }
  
      return res.send({
          status: true,         
          message: getString(language, "taskDeleted")
        });
        
      
    } catch (err) {
      logger.info("deleteTaskError"+ err);
      return res.send({
        status: false,
        message: err.message,
      });
    }
}


