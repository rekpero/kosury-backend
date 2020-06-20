import multer from "multer";
const upload = multer();
import express from "express";
import { PatientController } from "../controller";
import { logger } from "../utils";

export default (app: express.Router) => {
  //   app.post(
  //     "/uploadNotary/file",
  //     upload.single("fileData"),
  //     (req: any, res: any) => {
  //       console.info("Entered file nice");
  //     }
  //   );

  //   app.post("/uploadNotary/text", (req: any, res: any) => {
  //     console.info("Entered file nice");
  //   });

  app.get("/test", async (req: any, res: any) => {
    try {
      const result = await PatientController.getTodos();
      const items = result.map((item: any) => {
        return { id: item._id, name: item.name };
      });
      res.json(items);
    } catch (err) {
      res.status(500);
      res.end();
      logger.error(err);
    }
  });

  //   app.delete("/notary/phone/:phone/:id", (req: any, res: any) => {
  //     console.info("Entered file nice");
  //   });
};
