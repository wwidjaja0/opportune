import Application from "src/models/Application";
import { matchedData, validationResult } from "express-validator";
import validationErrorParser from "src/util/validationErrorParser";
import asyncHandler from "express-async-handler";
import createHttpError from "http-errors";

// Interface for creating/updating an application
// @interface CreateApplicationRequest
interface ApplicationCreate {
  userId: string;
  companyId: string;
  companyName?: string;
  position: string;
  link?: string;
  progress?: string;
}
interface ApplicationUpdate extends Partial<ApplicationCreate> {}

// @desc Retrieve all applications
// @route GET /api/applications/applied
// @access Private
//
// @returns {Application[]} 200 - Array of applications
export const getAllApplications = asyncHandler(async (req, res, next) => {
  const applications = await Application.find().lean().exec();

  res.status(200).json(applications);
});

//  @desc Create a new application
//  @route POST /api/applications/applied
//  @access Private
//
//  @param {CreateApplicationRequest} req.body - Application creation data (can use custom ts interface)
//  @returns {Application} 201 - Created application
//  @throws {400} - If required fields are missing
export const createApplication = asyncHandler(async (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    const errorMessage = validationErrorParser(result);
    return next(createHttpError(400, errorMessage));
  }

  const applicationData = matchedData(req) as ApplicationCreate;

  // check if there is already an exisiting application
  const existingApplication = await Application.findOne({
    userId: applicationData.userId,
    companyId: applicationData.companyId,
    position: applicationData.position,
  })
    .lean()
    .exec();

  if (existingApplication) {
    return next(createHttpError(409, "Application already exists"));
  }

  const newApplication = new Application(applicationData);
  await newApplication.save();

  res.status(201).json(newApplication);
});

//  @desc Get application by ID
//  @route GET /api/applications/applied/:id
//  @access Private
//
//  @param {string} id.path.required - Application ID
//  @returns {Application} 200 - Found application
//  @throws {404} - If application not found
//  @throws {400} - If ID is invalid
export const getApplicationByID = asyncHandler(async (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    const errorMessage = validationErrorParser(result);
    return next(createHttpError(400, errorMessage));
  }
  const { id } = matchedData(req, { locations: ["params"] }) as { id: string };
  const application = await Application.findById(id).lean().exec();

  if (!application) {
    return next(createHttpError(404, "Application not found."));
  }

  res.status(200).json(application);
});

//  @desc Update application by ID
//  @route PATCH /api/applications/applied/:id
//  @access Private
//
//  @param {string} id.path.required - Application ID
//  @param {Partial<CreateApplicationRequest>} req.body - Fields to update (could use custom ts interface)
//  @returns {Application} 200 - Updated application
//  @throws {404} - If application not found
//  @throws {400} - If ID is invalid
export const updateApplicationByID = asyncHandler(async (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    const errorMessage = validationErrorParser(result);
    return next(createHttpError(400, errorMessage));
  }
  const { id } = matchedData(req, { locations: ["params"] }) as { id: string };

  const validatedData = matchedData(req, {
    locations: ["body"],
  }) as ApplicationUpdate;

  if (Object.keys(validatedData).length === 0) {
    return next(
      createHttpError(400, "At least one field is required to update."),
    );
  }

  const updatedApplication = await Application.findByIdAndUpdate(
    id,
    { $set: validatedData },
    { new: true, runValidators: true },
  );

  if (!updatedApplication) {
    return next(createHttpError(404, "Application not found."));
  }

  res.status(200).json(updatedApplication);
});

//  @desc Delete application by ID
//  @route DELETE /api/applications/applied/:id
//  @access Private
//
//  @param {string} id.path.required - Application ID
//  @returns {Object} 200 - Success message and deleted application
//  @throws {404} - If application not found
//  @throws {400} - If ID is invalid
export const deleteApplicationByID = asyncHandler(async (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    const errorMessage = validationErrorParser(result);
    return next(createHttpError(400, errorMessage));
  }

  const { id } = matchedData(req, { locations: ["params"] }) as { id: string };

  const application = await Application.findByIdAndDelete(id).lean().exec();

  if (!application) {
    return next(createHttpError(404, "Application not found."));
  }

  res.status(200).json({
    message: "Application deleted successfully.",
    application,
  });
});

//  @desc Get applications by user ID
//  @route GET /api/applications/applied/user/:id?query=[query]&status=[status]&sortBy=[sortBy]
//  @access Private
//
//  @param {string} userId.path.required - User ID
//  @returns {Application[]} 200 - Array of user's applications
//  @throws {404} - If no applications found for user
//  @throws {400} - If user ID is invalid
export const getApplicationsByUserID = asyncHandler(async (req, res, next) => {
  const { userId } = req.params;
  const { query, status, sortBy } = req.query;
});
