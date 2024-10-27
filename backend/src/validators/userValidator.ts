import { body } from "express-validator";

const validateId = body("_id")
  .isString()
  .withMessage("_id must be a string")
  .isLength({ min: 1 })
  .withMessage("_id is required");

const validateEmail = body("email")
  .isEmail()
  .withMessage("Email must be a valid email address")
  .notEmpty()
  .withMessage("Email is required");

const validateFirstName = body("firstName")
  .isString()
  .withMessage("First name must be a string")
  .isLength({ min: 2 })
  .withMessage("First name must be at least 2 characters")
  .notEmpty()
  .withMessage("First name is required");

const validateLastName = body("lastName")
  .isString()
  .withMessage("Last name must be a string")
  .isLength({ min: 2 })
  .withMessage("Last name must be at least 2 characters")
  .notEmpty()
  .withMessage("Last name is required");

const validateIsAlumni = body("isAlumni")
  .optional()
  .isBoolean()
  .withMessage("isAlumni must be a boolean");

export const createUserValidator = () => [
  validateId,
  validateEmail,
  validateFirstName,
  validateLastName,
  validateIsAlumni,
];

export const updateUserValidator = () => [
  validateFirstName.optional(),
  validateLastName.optional(),
  validateIsAlumni,
];
