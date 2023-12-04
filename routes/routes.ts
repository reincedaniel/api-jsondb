// load up our shiny new route for users
import express, { Express, Request, Response, Application } from "express";

import { JsonDB, Config } from "node-json-db";

const db = new JsonDB(new Config("myDataBase", true, false, "/"));

/* import guestRoutes from "./guests";
import enviteRoutes from "./envites";
import extractionRoutes from "./extractions"; */

import questionRoutes from "./questions";
import extractionAppRoutes from "./extractionsApp";

const appRouter = (app: Application) => {
  // we've added in a default route here that handles empty routes
  // at the base API url
  app.get("/", (req: Request, res: Response) => {
    res.send("welcome to the development api-server");
  });

  // run our user route module here to complete the wire up
/*   guestRoutes(app, db);
  enviteRoutes(app, db);
  extractionRoutes(app, db); */

  questionRoutes(app, db);
  extractionAppRoutes(app, db);
};

// this line is unchanged
const _default = appRouter;
export { _default as default };
