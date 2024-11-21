import express from "express";
import * as companyController from "src/controllers/companyController";
import * as companyValidator from "src/validators/companyValidator";

const companyRouter = express.Router();

companyRouter.get("/", companyController.getCompanies);
companyRouter.post("/", companyController.createCompany);
companyRouter.get("/:id", companyController.getCompanyById);
companyRouter.patch("/:id", companyController.updateCompany);
companyRouter.delete("/:id", companyController.deleteCompany);

export default companyRouter;
