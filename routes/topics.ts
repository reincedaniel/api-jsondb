import express, { Express, Request, Response, Application } from "express";
import crypto from "node:crypto";
const userRoutes = async (app: Application, db: any) => {
  app.get("/topics", async (req: Request, res: Response) => {
    var data = await db.getData("/topics");
    res.send({ status: 200, data });
  });

  app.get("/topic/:id", async (req: Request, res: Response) => {
    var id = req.params.id;
    var resDataFinal = null;
    var resData = await db.getIndex("/topics", id);

    if (resData !== -1) {
      resDataFinal = await db.getData(`/topics[${resData}]`);
      res.send({ status: 200, ...resDataFinal });
    } else {
      res.send({ status: 401 });
    }
  });

  app.post("/topic", async (req: Request, res: Response) => {
    const uuID = crypto.randomUUID();
    await db.push(
      "/topics[]",
      {
        id: uuID,
        name: req.body?.name,
        createdAt: new Date().toISOString()
      },
      true
    );
    res.send({ status: 200 });
  });

  app.post("/activeTopicsBulk", async (req: Request, res: Response) => {
    console.log("req.body?.data,:: ",req.body?.data)
    const dt =  req.body?.data
    await db.push(
      "/activeTopics",
      dt,
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


  /* --------------------- */

  
  app.get("/activeQuestionsTopics", async (req: Request, res: Response) => {
    var data = await db.getData("/activeQuestionsTopics");
    res.send({ status: 200, data });
  });

  app.post("/activeQuestionsTopics", async (req: Request, res: Response) => {
    const uuID = crypto.randomUUID();
    await db.push(
      "/activeQuestionsTopics[]",
      {
        id: uuID,
        topicID: req.body?.topicID,
        active: true,
        dateInicio:req.body?.dateInicio,
        dateFim:req.body?.dateFim,
        className:req.body?.className,
        duration:req.body?.duration,
      },
      true
    );
    res.send({ status: 200 });
  });

  app.post("/activeQuestionsTopicsBulk", async (req: Request, res: Response) => {
    console.log("req.body?.data,:: ",req.body?.data)
    const dt =  req.body?.data
    await db.push(
      "/activeQuestionsTopics",
      dt,
      true
    );
    
    res.send({ status: 200 });
  });
  
  
};

export default userRoutes;
