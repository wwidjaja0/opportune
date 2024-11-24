import Application from "src/models/Application";
import asyncHandler from "express-async-handler";
import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";

/**
 * @desc Interface for creating/updating an application
 * @interface CreateApplicationRequest
 */
interface CreateApplicationRequest {
  userId: string;
  companyId: string;
  companyName: string;
  position: string;
  link?: string;
  progress?: {
    status: string;
    date: Date;
  }[];
}

/**
 * @desc Retrieve all applications
 * @route GET /api/applications/applied
 * @access Private
 *
 * @returns {Application[]} 200 - Array of applications
 * @throws {403} - If no application is found
 */
export const getAllApplications = asyncHandler(
  async (
    req: Request<object, object, CreateApplicationRequest>,
    res: Response,
    next: NextFunction,
  ) => {
    const applications = await Application.find({});
  },
);

/**
 * @desc Create a new application
 * @route POST /api/applications/applied
 * @access Private
 *
 * @param {CreateApplicationRequest} req.body - Application creation data
 * @returns {Application} 201 - Created application
 * @throws {400} - If required fields are missing
 */
export const createApplication = asyncHandler(
  async (
    req: Request<object, object, CreateApplicationRequest>,
    res: Response,
    next: NextFunction,
  ) => {
    const { userId, companyId, companyName, position, link, progress } =
      req.body;
  },
);

/**
 * @desc Get application by ID
 * @route GET /api/applications/applied/:id
 * @access Private
 *
 * @param {string} id.path.required - Application ID
 * @returns {Application} 200 - Found application
 * @throws {404} - If application not found
 * @throws {400} - If ID is invalid
 *
 */
export const getApplicationByID = asyncHandler(
  async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    const { id } = req.params;
  },
);

/**
 * @desc Update application by ID
 * @route PATCH /api/applications/applied/:id
 * @access Private
 *
 * @param {string} id.path.required - Application ID
 * @param {Partial<CreateApplicationRequest>} req.body - Fields to update
 * @returns {Application} 200 - Updated application
 * @throws {404} - If application not found
 * @throws {400} - If ID is invalid
 *
 */
export const updateApplicationID = asyncHandler(
  async (
    req: Request<{ id: string }, object , Partial<CreateApplicationRequest>>,
    res: Response,
    next: NextFunction,
  ) => {
    const { id } = req.params;
    const updateData = req.body;
  },
);

/**
 * @desc Delete application by ID
 * @route DELETE /api/applications/applied/:id
 * @access Private
 * @param {string} id.path.required - Application ID
 * @returns {Object} 200 - Success message and deleted application
 * @throws {404} - If application not found
 * @throws {400} - If ID is invalid
 */
export const deleteApplicationByID = asyncHandler(
  async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    const { id } = req.params;
  },
);

/**
 * @desc Get applications by user ID
 * @route GET /api/applications/applied/user/:id?query=[query]&status=[status]&sortBy=[sortBy]
 * @access Private
 *
 * @param {string} userId.path.required - User ID
 * @returns {Application[]} 200 - Array of user's applications
 * @throws {404} - If no applications found for user
 * @throws {400} - If user ID is invalid
 *
 */
export const getApplicationsByUserID = asyncHandler(
  async (
    req: Request<{ userId: string }>,
    res: Response,
    next: NextFunction,
  ) => {
    const { userId } = req.params;
  },
);
