import logger from "../../../logger.js";
import fs from "path";
import userSchemaModel from "../../model/userSchema.js";
const isEmailExist = (email) => {
    return new Promise(async (resolve) => {
        try {
            // const userData = await userSchemaModel.findOne({ email: email,userType: { $in: ['1', '2'] } });
            const userData = await userSchemaModel.findOne({ email: email });
            if (userData) {               
                 resolve(true);               

            } else {
                resolve(false);
            }
        } catch (error) {
            logger.info("------------ isEmailExist ------------\ " + error);
            resolve(false);
        }
    });
}
export default isEmailExist;