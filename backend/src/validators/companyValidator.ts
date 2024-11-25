import { body, param, query } from "express-validator";

// Default values for page and perPage
const DEFAULT_PAGE = 1;
const DEFAULT_PER_PAGE = 10;

const validatePage = query("page")
  .default(DEFAULT_PAGE)
  .isInt({ min: 1 })
  .toInt()
  .withMessage("Page must be positive integers");

const validatePerPage = query("perPage")
  .default(DEFAULT_PER_PAGE)
  .isInt({ min: 1 })
  .toInt()
  .withMessage("perPage must be positive integers");

const validateQuery = query("query")
  .isString()
  .withMessage("Query must be a string")
  .trim()
  .notEmpty()
  .withMessage("Missing query");

const validateQueryState = query("state")
  .default("all")
  .isString()
  .withMessage("State must be a string")
  .trim()
  .notEmpty()
  .withMessage("State must be a non-empty string");

const validateName = body("name")
  .exists()
  .withMessage("Missing name")
  .isString()
  .withMessage("Name must be a string")
  .trim()
  .notEmpty()
  .withMessage("Name must be a non-empty string");

const validateCity = body("city")
  .optional()
  .isString()
  .withMessage("City must be a string")
  .trim()
  .notEmpty()
  .withMessage("City must be a non-empty string");

const validateState = body("state")
  .optional()
  .isString()
  .withMessage("State must be a string")
  .trim()
  .notEmpty()
  .withMessage("State must be a non-empty string");

const validateId = param("id").isMongoId().withMessage("Invalid company id");

export const getCompanyValidator = [validateId];

export const getCompaniesValidator = [
  validatePage,
  validatePerPage,
  validateQuery,
  validateQueryState,
];

export const createCompanyValidator = [
  validateName,
  validateCity,
  validateState,
];

export const updateCompanyValidator = [
  validateId,
  validateName.optional(),
  validateCity,
  validateState,
];

export const deleteCompanyValidator = [validateId];
