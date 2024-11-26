import express from "express";
import * as companyController from "src/controllers/companyController";
import * as companyValidator from "src/validators/companyValidator";

const companyRouter = express.Router();

companyRouter.get(
  "/",
  companyValidator.getCompaniesValidator,
  companyController.getCompanies,
);

companyRouter.post(
  "/",
  companyValidator.createCompanyValidator,
  companyController.createCompany,
);

companyRouter.get(
  "/:id",
  companyValidator.getCompanyValidator,
  companyController.getCompanyById,
);

companyRouter.patch(
  "/:id",
  companyValidator.updateCompanyValidator,
  companyController.updateCompany,
);

companyRouter.delete(
  "/:id",
  companyValidator.deleteCompanyValidator,
  companyController.deleteCompany,
);

export default companyRouter;