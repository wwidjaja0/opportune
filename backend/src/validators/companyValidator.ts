import { body, param, query } from "express-validator";

// Default values for page and perPage
const DEFAULT_PAGE = 0;
const DEFAULT_PER_PAGE = 10;

const validatePage = query("page")
  .default(DEFAULT_PAGE)
  .isInt({ min: 0 })
  .toInt()
  .withMessage("page must be an integer > -1.");

const validatePerPage = query("perPage")
  .default(DEFAULT_PER_PAGE)
  .isInt({ min: 1 })
  .toInt()
  .withMessage("perPage must be an integer > 0.");

const validateQuery = query("query")
  .optional()
  .isString()
  .withMessage("query must be a string.")
  .trim();

const validateQueryState = query("state")
  .optional()
  .isString()
  .withMessage("state must be a string.")
  .trim();

const validateName = body("name")
  .isString()
  .withMessage("name must be a string.")
  .trim()
  .notEmpty()
  .withMessage("name must be a non-empty string.");

const validateCity = body("city")
  .optional()
  .isString()
  .withMessage("city must be a string.")
  .trim()
  .notEmpty()
  .withMessage("city must be a non-empty string.");

const validateState = body("state")
  .optional()
  .isString()
  .withMessage("state must be a string.")
  .trim()
  .notEmpty()
  .withMessage("state must be a non-empty string.");

const validateId = param("id")
  .isMongoId()
  .withMessage("Invalid company id. (Must be a Mongo ObjectID.)");

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
