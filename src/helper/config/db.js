import mongoose from "mongoose";
import config from "../envconfig/envVars.js";



let database_uri = "";
if (config.NODE_ENV === "production") {
  database_uri = `mongodb://${config.DB_HOST}:${config.DB_PORT}/${config.DB_NAME}`;
} else if (config.NODE_ENV === "staging") {
  database_uri = `mongodb://${config.DB_HOST}:${config.DB_PORT}/${config.DB_NAME}`;
} else {
  database_uri = `mongodb://${config.DB_HOST}:${config.DB_PORT}/${config.DB_NAME}`;
}

const dataBase = mongoose
  .connect(database_uri)
  .then(() => console.log("Connected!"));

export default dataBase;