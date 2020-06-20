import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import route from "./router";
import { logger } from "./utils";
import { MongoHelper } from "./database";

// initialize configuration
dotenv.config();

// port is now available to the Node.js runtime
// as if it were an environment variable
const PORT = process.env.SERVER_PORT || process.env.PORT || 5000; // default port to listen
const URI = `mongodb+srv://rekpero:${process.env.DB_PASSWORD}@cluster0-vg0xb.mongodb.net/globalDb`;

const app = express();
const router = express.Router();

// app.use(timeout("600000"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const loggerMiddleware = (
  request: express.Request,
  response: express.Response,
  next: any
) => {
  logger.info(`${request.method} ${request.path}`);
  next();
};

app.use(loggerMiddleware);

// app.use(haltOnTimedOut);
app.use(cors());
// app.use(haltOnTimedOut);
route(router);

// Now we can tell the app to use our routing code:
app.use(router);

// function haltOnTimedOut(req: any, res: any, next: any) {
//   if (!req.timedout) next();
// }

// start the Express server
app.listen(PORT, async () => {
  logger.info(`server started at http://localhost:${PORT} `);
  try {
    await MongoHelper.connect(URI);
    logger.info(`Connected to Mongo!`);
  } catch (err) {
    logger.error(`Unable to connect to Mongo!`, err);
  }
});
