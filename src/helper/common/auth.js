import jwt from "jsonwebtoken"

import config from "../../helper/envconfig/envVars.js";
import dataBase from "../config/db.js";
/**
 * @Method Use For check login authentication
 * @author Abdul Nadeem
 * @date 21-jun 2024
 */

export const loginAuth = (req, res, next) =>{
    var result=loginFun(req,res);
    if(result){
        return next();
    }else{
        const result=checkToken(req,res);
     
        if(result==1){
            next();
        }else{
            res.status(401).send({
                status: false,
                message: "Token is not valid",
            });
        }
    }
}
export const loginFun = (req, res) =>
{
    const bearerHeader = req.headers["authorization"];

    

    if (bearerHeader)
    {
        const bearer = bearerHeader.split(" ");

        if (bearer.length > 1)
        {
            const bearerToken = bearer[1];
            if (bearerToken == config.LOGIN_BEARER)
            {
                return true;
            } else
            {
                return false;
            }
        }
    }
    console.log("receive token== " + bearerHeader);
   return false
};
export const staticWithJwt = (req, res, next) =>{
  loginAuth(req,res,next);
}

export const checkToken = (req, res, next) => {
    // Express headers are auto converted to lowercase
    let token = req.headers["x-access-token"] || req.headers.authorization;
    // console.log("bererararTooken",token);
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
    console.log("token",token);
  return  jwt.verify(token, config.JWT_SECRET, (err, decoded) => {
      if (err) {
        res.status(401).send({
          status: false,
          message: "Token is not valid",
        });
      } else
      {
        req.decoded=decoded;
        return true;
      }
    });
}