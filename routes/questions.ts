import express, { Express, Request, Response, Application } from "express";
import crypto from "node:crypto";
const userRoutes = async (app: Application, db: any) => {
  app.get("/questions", async (req: Request, res: Response) => {
    var data = await db.getData("/questions");
    res.send({ status: 200, data });
  });

  app.get("/question/:id", async (req: Request, res: Response) => {
    var id = req.params.id;
    var resDataFinal = null;
    var resData = await db.getIndex("/questions", id);

    if (resData !== -1) {
      resDataFinal = await db.getData(`/questions[${resData}]`);
      res.send({ status: 200, ...resDataFinal });
    } else {
      res.send({ status: 401 });
    }
  });

  app.post("/question", async (req: Request, res: Response) => {
    const uuID = crypto.randomUUID();
    await db.push(
      "/questions[]",
      {
        id: uuID,
        name: req.body?.name,
      },
      true
    );
    res.send({ status: 200 });
  });
};

export default userRoutes;
