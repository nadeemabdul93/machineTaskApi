import dotenv from "dotenv";
dotenv.config();
import express from 'express';
import { createRequire } from "module";
import http from "http";
import https from "https";
import fs from "fs";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import taskRoute from "./src/api/task/index.js";
import { getLocalIP } from "./src/helper/util/localIp.js";
import moment from "moment-timezone";
import logger from "./logger.js";
const app = express();
const corsOptions = {
    origin: "*",
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
  };
  app.use(cors(corsOptions));
  app.use(express.json({ limit: "200mb" }));
app.use(express.urlencoded({ limit: "200mb", extended: true }));
app.use("/assets", express.static("assets"));

const require = createRequire(import.meta.url);
  // import swaggerDocument from "./swagger.json";
const swaggerDocument = require("./swagger.json");
const PORT = process.env.port || 3000;
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req, res) => {
  res.send('Hello, World!');
});
app.use("/machineTaskApi", swaggerUi.serve, (...args) =>
    swaggerUi.setup(swaggerDocument)(...args)
  );
  app.use(express.json()); 
app.use("/tasks", taskRoute);
let options={}
let server = http.createServer(options, app).listen(PORT, function () {
    logger.info(
      `QT PET listening on port ${PORT}! Go to https://localhost:${PORT}/`
    );
    logger.info(
      `QT PET listening on port ${PORT}! Go to https://${getLocalIP()}:${PORT}/`
    );
  });
  export default app;
  