import express from "express";
import * as applicationController from "src/controllers/applicationController";
import * as applicationValidator from "src/validators/applicationValidator";
const applicationRouter = express.Router();

applicationRouter.get("/", applicationController.getAllApplications);
applicationRouter.post("/", applicationController.createApplication);
applicationRouter.get("/:id", applicationController.getApplicationByID);
applicationRouter.patch("/:id", applicationController.updateApplicationByID);
applicationRouter.delete("/:id", applicationController.deleteApplicationByID);
applicationRouter.get(
  "/user/:id",
  applicationController.getApplicationsByUserID,
);

export default applicationRouter;
