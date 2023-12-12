import express, { Express, Request, Response, Application } from "express";
import crypto from "node:crypto";
const userRoutes = async (app: Application, db: any) => {
  app.get("/responses", async (req: Request, res: Response) => {
    var data = await db.getData("/responses");
    res.send({ status: 200, data });
  });

  app.get("/response/:id", async (req: Request, res: Response) => {
    var id = req.params.id;
    var resDataFinal = null;
    var resData = await db.getIndex("/responses", id);

    if (resData !== -1) {
      resDataFinal = await db.getData(`/responses[${resData}]`);
      res.send({ status: 200, ...resDataFinal });
    } else {
      res.send({ status: 401 });
    }
  });

  app.post("/response", async (req: Request, res: Response) => {
    const uuID = crypto.randomUUID();
    await db.push(
      "/responses[]",
      {
        id: uuID,
       ...req.body,
       createdAt: new Date().toISOString()
      },
      true
    );
    res.send({ status: 200 });
  });


  app.get("/activeTopics", async (req: Request, res: Response) => {
    var data = await db.getData("/activeTopics");
    res.send({ status: 200, data });
  });
  app.post("/activeTopics", async (req: Request, res: Response) => {
    const uuID = crypto.randomUUID();
    await db.push(
      "/activeTopics[]",
      {
        id: uuID,
        topicID: req.body?.topicID,
        createdAt: new Date().toISOString()
      },
      true
    );
    res.send({ status: 200 });
  });
  
};

export default userRoutes;
