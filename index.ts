import express, { Express, Request, Response, Application } from "express";
import cors from "cors";

import dotenv from "dotenv";
import { json, urlencoded } from "body-parser";
import routes from "./routes/routes";

//For env File
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(json()); // to support JSON-encoded bodies
app.use(
  urlencoded({
    // to support URL-encoded bodies
    extended: true,
  })
);
routes(app);
app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
