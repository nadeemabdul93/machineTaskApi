import logger from "../../../logger.js";
import userSchemaModel from "../../model/userSchema.js";
import { getString } from "../../helper/common/helper.js";
import bcrypt from "bcrypt"
import moment from "moment";
import { getJwtToken} from "../../helper/common/helper.js";
import userResponse from "../../response/user.js";
import { validationResult } from "express-validator";
import mongoose from "mongoose";
import config from "../../helper/envconfig/envVars.js";
import crypto from "crypto";
import fs from "fs";
import path from "path";
import isEmailExist from "./services.js";
import jwt from "jsonwebtoken";
import { lowerCase } from "lower-case";


/**
 * @Method used to login a user
 * @author Abdul
 * @date 21-Jun-2024
 */
export const login = async (req, res) => {
  try {
    const { email, password, userType,language } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.send({
        status: false,
        message: getString(language, errors.errors[0]["msg"]),
      });
    }
    const checkUser = await userSchemaModel.findOne({ email: email });


        if (checkUser.userType == userType) {

          
            if (checkUser.status == 1) {
              if (checkUser.password) {
                if (checkUser && bcrypt.compareSync(password, checkUser.password)) {

                  const token = await getJwtToken({
                    id: checkUser._id,
                    email: checkUser.email,
                    userType: checkUser.userType,
                  });
                  
                  const result = await userSchemaModel.findOne({ email: email }).lean();
                  result.token = token; 
                  result.status= result.status==1?"active":'suspended'                
                  return res.send({
                    status: true,
                    message: getString(language, "loginSuccess"),
                    data: new userResponse(result)
                  });
                } else {
                  return res.send({
                    status: false,
                    message: getString(language, "invalidEmailPassword")

                  });
                }
              }
            } else if (checkUser.status == 2) {
              return res.send({
                status: false,
                message: getString(language, "accounSuspend")

              });
            } else {
              return res.send({
                status: false,
                message: getString(language, "accoundelete")

              });
            }

        } else {

          return res.send({
            status: false,
            message: getString(language, "userNotFounds")
          });
        }
     

    
  } catch (err) {
    console.log("loginerror", err);
    return res.send({
      status: false,
      message: err.message,
    });
  }
}

/**
 * @Method used to register a user
 * @author Abdul
 * @date 21-jun-2024
 */
export const register = async (req, res) => {

  try {
    const { firstName, lastName, email, password, userType, language } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.send({
        status: false,
        message: getString(language, errors.errors[0]["msg"]),
      });
    }
    
    
    const checkEmail = await isEmailExist(email);
    
    if (!checkEmail) {
    const passwordBcrypt = bcrypt.hashSync(password, 10);

    const userTypeConvert=userType.toLowerCase();
      let userData = new userSchemaModel({
        firstName: firstName ? firstName : null,
        lastName: lastName ? lastName : null,
        email: email,
        password: passwordBcrypt,
        userType: userTypeConvert
      });
      const saveData = await userData.save();
      if (saveData) {
       const result = await userSchemaModel.findById(saveData._id).lean();
       const token = await getJwtToken({
        id: result._id,
        email: result.email,
        userType: result.userType,
      });
      result.token = token;
      result.status= result.status==1?"active":'suspended' 
        return res.send({
          status: true,
          message: getString(language, "registrationSuccess"),          
          data: new userResponse(result)
        });
      } else {
        return res.send({
          status: false,
          message: getString(language, "registrationFailed")
        });
      }

    } else {
      return res.send({
        status: false,
        message: getString(language, "emailAlreadyExist")
      });
    }

  } catch (err) {
    console.log("errorrrrruser", err);
    return res.send({
      status: false,
      message: err.message,
    });
  }
}
/**
 * @Method used to get profile detail for self and others
 * @author Abdul
 * @date 21-jun-2024
 */
export const getProfileDetails = async (req, res) => {
  try {
    const { language } = req.body;
    // console.log("userDta",req.decoded);
      const userId = req.decoded.id;
      const getUserDetail = await userSchemaModel.findById(userId).lean();

    if (!getUserDetail) {
      return res.send({
        status: false,
        message: getString(language, "invalidToken"),
      });
    }
    const token = await getJwtToken({
      id: getUserDetail._id,
      email: getUserDetail.email,
      userType: getUserDetail.userType,
    });
    getUserDetail.token=token;
    getUserDetail.status=getUserDetail.status==1?"active":"suspende";

    return res.send({
      status: true,
      message: getString(language, "getProfileDetails"),
      data: new userResponse(getUserDetail)
    });

  } catch (err) {
    logger.info("getProfileErro : "+err);
    return res.send({
      status: false,
      message: err.message,
    });
  }
}

/**
 * @Method used to update profile
 * @author Abdul
 * @date 21-jun-2024
 */
export const updateProfile = async (req, res) => {
  try {
    const { firstName, lastName ,language } = req.body;
   
    const userId = req.decoded.id;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.send({
        status: false,
        message: getString(language, errors.errors[0]["msg"]),
      });
    }
    const checkUser = await userSchemaModel.findOne({ _id: userId }).lean();
    if(!checkUser){
      return res.send({
        status: false,
        message: getString(language, "userDoesntExist"),
      });
    }
    let userParams = {
      firstName,
      lastName,
      updatedAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
    };
    
    const updatedUser = await userSchemaModel.findByIdAndUpdate(userId, { $set: userParams }, { new: true });
    if (!updateProfile) {
      return res.send({
        status: false,
        message: getString(language, "failedProfileUpdate"),
      });
    }
   
    return res.send({
      status: true,
      message: getString(language, "profileSuccessupdate"),
  
    });
  } catch (err) {
    // logger.info("updateProfileError : "+err);
    console.log("error",err);
    return res.send({
      status: false,
      message: err.message,
    });
  }
}

/**
 * @Method used to logout user from device
 * @author Abdul
 * @date 21-Jun-2024
 */
export const userLogOut = async (req, res) => {
  try {
    const { language } = req.body;
    const userId = req.decoded.id;
    
    return res.send({
      status: true,
      message: getString(language, "logoutSuccess"),
    });
  } catch (err) {
    console.log("logouterro",err);
    return res.send({
      status: false,
      message: err.message,
    });
  }
}
