import User from "src/models/User";
import asyncHandler from "express-async-handler";

// @desc Get all users
// @route GET /api/users
// @access Private
export const getUsers = asyncHandler(async (req, res, next) => {});

// @desc Create new user
// @route POST /api/users
// @access Private
export const createUser = asyncHandler(async (req, res, next) => {
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
  } = req.body;
});

// @desc Get user by ID
// @route GET /api/users/:id
// @access Private
export const getUserById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
});

// @desc Update a user
// @route PATCH /api/users/:id
// @access Private
export const updateUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const {
    type,
    linkedIn,
    phoneNumber,
    major,
    classLevel,
    company,
    shareProfile,
  } = req.body;
});

// @desc Delete a user
// @route DELETE /api/users/:id
// @access Private
export const deleteUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
});

// @desc Get alumni willing to share profile
// @route GET /api/users/alumni
// @access Private
export const getOpenAlumni = asyncHandler(async (req, res, next) => {
  const { page, perPage, query } = req.query;
});
