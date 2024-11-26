import { body, query } from "express-validator";
import { UserType } from "src/models/User";

const validateId = body("_id")
  .isString()
  .withMessage("_id must be a string.")
  .isLength({ min: 1 })
  .withMessage("_id is required.");

const validateEmail = body("email")
  .isEmail()
  .withMessage("email must be a valid email address.")
  .notEmpty()
  .withMessage("email is required.");

const validateName = body("name")
  .isString()
  .withMessage("name must be a string.")
  .isLength({ min: 2 })
  .withMessage("name must be at least 2 characters.")
  .notEmpty()
  .withMessage("name is required.");

const validateType = body("type")
  .optional()
  .isString()
  .withMessage("type of account must be a string.")
  .isIn(Object.values(UserType))
  .withMessage("type is not a valid user type.");

const validateLinkedIn = body("linkedIn")
  .optional()
  .isURL({ require_valid_protocol: true })
  .withMessage("linkedIn must be a valid URL.");

const validatePhoneNumber = body("phoneNumber")
  .optional()
  .isMobilePhone("any")
  .withMessage("phoneNumber must be a valid phone number.");

// Only for students
const validateMajor = body("major")
  .optional()
  .isString()
  .withMessage("major must be a string.")
  .isLength({ min: 2 })
  .withMessage("major must be at least 2 characters.");

// Only for students
const validateClassLevel = body("classLevel")
  .optional()
  .isString()
  .withMessage("classLevel must be a string.")
  .isLength({ min: 2 })
  .withMessage("classLevel must be at least 2 characters.");

// Only for alumni
const validateCompany = body("company")
  .optional()
  .isString()
  .withMessage("company must be a valid string.");

// Only for alumni
const validateShareProfile = body("shareProfile")
  .optional()
  .isBoolean()
  .withMessage("shareProfile must be a boolean.");

const validatePage = query("page")
  .optional()
  .isNumeric()
  .withMessage("page must be a number.");

const validatePerPage = query("perPage")
  .optional()
  .isNumeric()
  .withMessage("perPage must be a number.");

const validateQuery = query("query")
  .isString()
  .withMessage("query must be a string.")
  .isLength({ min: 1 })
  .withMessage("query is required.");

export const createUserValidator = [
  validateId,
  validateEmail,
  validateName,
  validateType,
  validateLinkedIn,
  validatePhoneNumber,
  validateMajor,
  validateClassLevel,
  validateCompany,
  validateShareProfile,
];

export const updateUserValidator = [
  validateName.optional(),
  validateType,
  validateLinkedIn,
  validatePhoneNumber,
  validateMajor,
  validateClassLevel,
  validateCompany,
  validateShareProfile,
];

export const getOpenAlumniValidator = [
  validatePage,
  validatePerPage,
  validateQuery,
];
