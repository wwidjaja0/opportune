import { body, query } from "express-validator";

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
  .trim()
  .notEmpty()
  .withMessage("Missing query")
  .isString()
  .withMessage("Query must be a string");

const validateQueryState = query("state")
  .default("all")
  .isString()
  .trim()
  .notEmpty()
  .withMessage("State must be a non-empty string");

const validateName = body("name")
  .exists()
  .withMessage("Missing name")
  .isString()
  .trim()
  .notEmpty()
  .withMessage("Name must be a non-empty string");

const validateCity = body("city")
  .optional()
  .isString()
  .trim()
  .notEmpty()
  .withMessage("City must be a non-empty string");

const validateState = body("state")
  .optional()
  .isString()
  .trim()
  .notEmpty()
  .withMessage("State must be a non-empty string");

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
  validateName.optional(),
  validateCity,
  validateState,
];
