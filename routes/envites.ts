import express, { Express, Request, Response, Application } from "express";
const enviteRoutes = async (app: Application, db: any) => {
  const getGuest = async (id: any) => {
    var resDataFinal = null;
    var resData = await db.getIndex("/guests", id);

    if (resData !== -1) {
      resDataFinal = await db.getData(`/guests[${resData}]`);
      return { ...resDataFinal };
    } else {
      return null;
    }
  };
  app.get("/envites", async (req: Request, res: Response) => {
    var data = await db.getData("/envites");
    res.send({ status: 200, data });
  });

  app.get("/envite/:id", async (req: Request, res: Response) => {
    var id = req.params.id;
    var resDataFinal = null;
    var resData = await db.getIndex("/envites", id);

    if (resData !== -1) {
      resDataFinal = await db.getData(`/envites[${resData}]`);
      res.send({ status: 200, ...resDataFinal });
    } else {
      res.send({ status: 401 });
    }
  });

  app.post("/envite", async (req: Request, res: Response) => {
    var id = req.body?.id;
    var resData = await db.getIndex("/envites", id);

    if (resData === -1) {
      await db.push(
        "/envites[]",
        {
          id: req.body?.id,
          name: req.body?.name,
        },
        true
      );
      res.send({ status: 200 });
    } else {
      res.send({ status: 409 });
    }
  });

  app.get("/enviteaid/:id", async (req: Request, res: Response) => {
    var id = req.params.id;
    var resData = await db.getIndex("/envites", id);

    if (resData === -1) {
      const dt = await getGuest(id);
      console.log("await: ", dt);
      if (dt) {
        await db.push(
          "/envites[]",
          {
            id: dt.id,
            name: dt.name,
          },
          true
        );
        res.send({ status: 200 });
      } else res.send({ status: 404 });
    } else {
      res.send({ status: 409 });
    }
  });
};

export default enviteRoutes;
