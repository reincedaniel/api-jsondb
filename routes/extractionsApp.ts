import express, { Express, Request, Response, Application } from "express";
import crypto from "node:crypto";

import excelToJson from "convert-excel-to-json";
import multer from "multer";
import fs from "fs-extra";
const extractions = async (app: Application, db: any) => {
  var upload = multer({ dest: "uploads/" });


  app.post(
    "/readexceltopics",
    upload.single("file"),
    async (req: Request, res: Response) => {
      try {
        if (req.file?.filename === null || req.file?.filename === undefined) {
          res.send({ status: 400 });
        } else {
          let filePath = "uploads/" + req.file.filename;

          const excelData = excelToJson({
            sourceFile: filePath,
            header: {
              rows: 1,
            },
            columnToKey: {
              "*": "{{columnHeader}}",
            },
          });
          fs.remove(filePath);
          const myArray = Object.values(excelData);

          // add to DB
          if (myArray && myArray.length > 0) {
            const dataResult = myArray[0];
            const dataFinal = dataResult.map((resValue) => {
              return {
                id: crypto.randomUUID(),
                ...resValue,
              };
            });
            await db.push("/topics", dataFinal, false);

            res.send({ status: 200 });
          } else {
            res.send({ status: 400 });
          }
        }
      } catch (error) {
        res.send({ status: 500, error });
      }
    }
  );
  app.post(
    "/readexcelquestions",
    upload.single("file"),
    async (req: Request, res: Response) => {
      try {
        if (req.file?.filename === null || req.file?.filename === undefined) {
          res.send({ status: 400 });
        } else {
          let filePath = "uploads/" + req.file.filename;

          const excelData = excelToJson({
            sourceFile: filePath,
            header: {
              rows: 1,
            },
            columnToKey: {
              "*": "{{columnHeader}}",
            },
          });
          fs.remove(filePath);
          const myArray = Object.values(excelData);

          // add to DB
          if (myArray && myArray.length > 0) {
            const dataResult = myArray[0];
            const dataFinal = dataResult.map((resValue) => {
              return {
                id: crypto.randomUUID(),
                ...resValue,
              };
            });
            await db.push("/questions", dataFinal, false);

            res.send({ status: 200 });
          } else {
            res.send({ status: 400 });
          }
        }
      } catch (error) {
        res.send({ status: 500, error });
      }
    }
  );
};

export default extractions;
