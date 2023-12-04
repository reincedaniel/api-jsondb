import express, { Express, Request, Response, Application } from "express";
import crypto from "node:crypto";
const userRoutes = async (app: Application, db: any) => {
  app.get("/guests", async (req: Request, res: Response) => {
    var data = await db.getData("/guests");
    res.send({ status: 200, data });
  });

  app.get("/guest/:id", async (req: Request, res: Response) => {
    var id = req.params.id;
    var resDataFinal = null;
    var resData = await db.getIndex("/guests", id);

    if (resData !== -1) {
      resDataFinal = await db.getData(`/guests[${resData}]`);
      res.send({ status: 200, ...resDataFinal });
    } else {
      res.send({ status: 401 });
    }
  });

  app.post("/guest", async (req: Request, res: Response) => {
    const uuID = crypto.randomUUID();
    await db.push(
      "/guests[]",
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
