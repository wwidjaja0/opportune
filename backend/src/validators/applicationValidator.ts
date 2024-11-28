import { body, param, query } from "express-validator";

const validateId = param("id")
  .isMongoId()
  .withMessage("Invalid application id. (Must be a Mongo ObjectID.)")
  .trim();

const validateUserId = body("userId")
  .isString()
  .withMessage("userId must be a string.")
  .trim()
  .notEmpty()
  .withMessage("userId must be a non-empty string.");

const validateCompanyId = body("companyId")
  .isMongoId()
  .withMessage("Invalid company ID. (Must be a Mongo ObjectID.)")
  .trim();

const validatePosition = body("position")
  .isString()
  .withMessage("position must be a string.")
  .trim()
  .notEmpty()
  .withMessage("position must be a non-empty string.");

const validateCompanyName = body("companyName")
  .isString()
  .withMessage("company name must be a string.")
  .trim()
  .notEmpty()
  .withMessage("company name must be a non-empty string.");

const validateLink = body("link")
  .optional()
  .isURL({
    require_valid_protocol: true,
  })
  .withMessage("link must be a valid URL.")
  .trim();

const validateProgress = [
  body("progress")
    .optional()
    .isArray()
    .withMessage("progress must be an array of application statuses."),
  body("progress.*.status")
    .isString()
    .withMessage("Each application status must be a string.")
    .trim()
    .notEmpty()
    .withMessage("each application status must be a non-empty string."),
  body("progress.*.date")
    .optional()
    .notEmpty()
    .withMessage("each application status must have a date.")
    .bail()
    .isISO8601()
    .withMessage(
      "each application status's date must be a valid ISO 8601 date.",
    ),
];

export const createApplicationValidator = [
  validateUserId,
  validateCompanyId,
  validateCompanyName,
  validatePosition,
  validateLink,
  validateProgress,
];

export const getApplicationValidator = [validateId];

export const updateApplicationValidator = [
  validateId,
  validateUserId.optional(),
  validateCompanyId.optional(),
  validateCompanyName.optional(),
  validatePosition.optional(),
  validateLink.optional(),
  ...validateProgress,
];

export const deleteApplicationValidator = [validateId];
