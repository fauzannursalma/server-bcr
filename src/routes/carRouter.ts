import express from "express";
import { CarController } from "../controllers/carController";
import { authAdmin } from "../middlewares/auth";
import upload from "../utils/fileUploadConfig";

const carRouter = express.Router();

const carController = new CarController();

carRouter.get("/", carController.list.bind(carController));
carRouter.get("/:id", carController.detail.bind(carController));

// admin & superadmin only
carRouter.post(
  "/",
  upload.single("image"),
  carController.create.bind(carController)
);
carRouter.put(
  "/:id",
  upload.single("image"),
  carController.update.bind(carController)
);
carRouter.delete("/:id", carController.destroy.bind(carController));

export default carRouter;
