/** @format */
import Jwt from "jsonwebtoken";
import config from "../envconfig/envVars.js"
import MESSAGES_DATA from "../language/lang_en.js";
import crypto from "crypto";
import geolib from "geolib";
import moment from "moment"
import bcrypt from "bcrypt"
import { body } from "express-validator";
import userSchemaModel from "../../model/userSchema.js";
import mongoose from "mongoose";
export const getString = (lang, name) => {
  return MESSAGES_DATA[name];
}

export const taskStatus = {
  completed: 'completed',
  active: 'active',
}
export const getJwtToken = async (data) => {
 
  try {
    const token = Jwt.sign(data, config.JWT_SECRET, { expiresIn: config.JWT_EXPIRES_IN });
    return token;
  } catch (error) {
    console.error('Error generating JWT token:', error);
    throw new Error('Failed to generate JWT token');
  }
}
