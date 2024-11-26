import User from "src/models/User";
import { matchedData, validationResult } from "express-validator";
import asyncHandler from "express-async-handler";
import createHttpError from "http-errors";
import validationErrorParser from "src/util/validationErrorParser";

interface BaseUserResponse {
  _id?: string;
  email: string;
  name: string;
  type: string;
}

interface StudentResponse extends BaseUserResponse {
  linkedIn?: string;
  phoneNumber?: string;
  major?: string;
  classLevel?: string;
}

interface AlumniResponse extends BaseUserResponse {
  linkedIn?: string;
  phoneNumber?: string;
  company?: string;
  shareProfile?: boolean;
}

type UserResponse = StudentResponse | AlumniResponse;

// @desc Get all users
// @route GET /api/users
// @access Private
export const getUsers = asyncHandler(async (_, res, next) => {
  const users = await User.find().lean().exec();

  if (!users.length) {
    return next(createHttpError(404, "No users found."));
  }

  res.status(200).json(users);
});

// @desc Create new user
// @route POST /api/users
// @access Private
export const createUser = asyncHandler(async (req, res, next) => {
  const reqErrors = validationResult(req);
  if (!reqErrors.isEmpty()) {
    return next(createHttpError(400, validationErrorParser(reqErrors)));
  }

  const {
    _id,
    email,
    name,
    type,
    linkedIn,
    phoneNumber,
    major,
    classLevel,
    company,
    shareProfile,
  } = matchedData(req, { locations: ["body"] });

  // check if the user already exists
  const foundUser = await User.findOne({
    $or: [{ _id }, { email }],
  }).lean();

  if (foundUser) {
    return next(createHttpError(409, "User already exists."));
  }

  const newUser = new User({
    _id,
    email,
    name,
    type,
    linkedIn,
    phoneNumber,
    major,
    classLevel,
    company,
    shareProfile,
  });

  await newUser.save();

  res.status(201).json(newUser);
});

// @desc Get user by ID
// @route GET /api/users/:id
// @access Private
export const getUserById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  // check if the user exists
  const foundUser = await User.findById(id);
  if (!foundUser) {
    return next(createHttpError(404, "User not found."));
  }

  let responseData: UserResponse = {
    _id: foundUser._id,
    email: foundUser.email,
    name: foundUser.name,
    type: foundUser.type,
  };

  if (foundUser.type.includes("Student")) {
    responseData = {
      ...responseData,
      linkedIn: foundUser.linkedIn,
      phoneNumber: foundUser.phoneNumber,
      major: foundUser.major,
      classLevel: foundUser.classLevel,
    } as StudentResponse;
  } else {
    responseData = {
      ...responseData,
      company: foundUser.company,
      shareProfile: foundUser.shareProfile,
    } as AlumniResponse;

    if (foundUser.shareProfile) {
      responseData.linkedIn = foundUser.linkedIn;
      responseData.phoneNumber = foundUser.phoneNumber;
    }
  }

  res.status(200).json(responseData);
});

// @desc Update a user
// @route PATCH /api/users/:id
// @access Private
export const updateUser = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(createHttpError(400, validationErrorParser(errors)));
  }

  const { id } = req.params;
  const validatedData = matchedData(req, { locations: ["body"] });

  // check if at least one field to update is in body
  if (Object.keys(validatedData).length === 0) {
    return next(createHttpError(400, "At least one field required to update."));
  }

  // find the user to update
  const foundUser = await User.findByIdAndUpdate(
    id,
    { $set: validatedData },
    { new: true, runValidators: true },
  );

  // check if the user exists
  if (!foundUser) {
    return next(createHttpError(404, "User not found."));
  }

  res.status(200).json(foundUser);
});

// @desc Delete a user
// @route DELETE /api/users/:id
// @access Private
export const deleteUser = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(createHttpError(400, validationErrorParser(errors)));
  }

  const { id } = req.params;

  const foundUser = await User.findByIdAndDelete(id);

  // check if the user already exists
  // check if the user exists
  if (!foundUser) {
    return next(createHttpError(404, "User not found."));
  }

  res.status(200).json(foundUser);
});

// @desc Get alumni willing to share profile
// @route GET /api/users/alumni
// @access Private
export const getOpenAlumni = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(createHttpError(400, validationErrorParser(errors)));
  }

  const { page = "1", perPage = "10", query } = req.query;
  console.log(req.query);

  const pageString = typeof page === "string" ? page : "1";
  const perPageString = typeof perPage === "string" ? perPage : "10";

  // check if the query parameter is missing or empty
  if (typeof query !== "string" || query.trim() === "") {
    return next(createHttpError(400, "Missing or empty query parameter."));
  }

  const pageNum = parseInt(pageString, 10) || 1;
  const perPageNum = parseInt(perPageString, 10) || 10;

  const dbQuery = User.find({
    type: "Alumni",
    shareProfile: true,
  });

  // add a name search filter if provided
  if (query) {
    dbQuery.where("name").regex(new RegExp(query, "i"));
  }

  // count total results for pagination
  const total = await dbQuery.clone().countDocuments();

  // apply pagination
  dbQuery.skip((pageNum - 1) * perPageNum).limit(perPageNum);

  const users = await dbQuery.lean().exec();

  // checks if we found any users
  if (users.length === 0) {
    return next(createHttpError(404, "No alumni found matching the criteria."));
  }

  res.status(200).json({
    page: pageNum,
    perPage: perPageNum,
    total,
    data: users.map((user) => ({
      id: user._id,
      email: user.email,
      name: user.name,
      linkedIn: user.linkedIn,
      phoneNumber: user.phoneNumber,
      company: user.company,
      shareProfile: user.shareProfile,
    })),
  });
});
