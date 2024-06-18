/** @format */
import Jwt from "jsonwebtoken";
import config from "../envconfig/envVars.js"
import MESSAGES_DATA from "../language/lang_en.js";
import crypto from "crypto";
import geolib from "geolib";
import moment from "moment"
import bcrypt from "bcrypt"
import { body } from "express-validator";
import mongoose from "mongoose";
const encryptionKey = 'asdfghjklzxcvb@#$%&*!)1234567890';
export const getString = (lang, name) => {
  return MESSAGES_DATA[name];
}

export const taskStatus = {
  active: 1,
  inActive: 2,
}
export const getJwtToken = async (data) => {
  // const token = Jwt.sign(data, config.JWT_SECRET, {
  //   expiresIn: config.JWT_EXPIRES_IN,
  // });
  const token = Jwt.sign(data, config.JWT_SECRET); // save toekn to db and check by it 🙂
  const jwtToken = await bcrypt.hash(token, 10);
  var updt = await userSchemaModel.findOneAndUpdate({ _id: new mongoose.Types.ObjectId(data.id) }, { jwtToken: jwtToken });
  return token;
}
