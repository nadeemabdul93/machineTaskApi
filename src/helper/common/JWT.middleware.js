import jwt from "jsonwebtoken";
import config from "../../helper/envconfig/envVars.js";
import dataBase from "../config/db.js";
import mongoose from "mongoose";
import bcrypt from "bcrypt"

const checkToken = (req, res, next) => {
  // Express headers are auto converted to lowercase
  let token = req.headers["x-access-token"] || req.headers.authorization;

  if (!token) {
    res.status(401).send({
      status: false,
      message: "Required authorization header not found.",
    });
    return;
  }
  if (token.startsWith("Bearer ")) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }
  jwt.verify(token, config.JWT_SECRET, async (err, decoded) => {
    if (err) {
      res.status(401).send({
        status: false,
        message: "Token is not valid",
      });
    } else {
    req.decoded = decoded;
      next();
    }
  });
};
export default checkToken;