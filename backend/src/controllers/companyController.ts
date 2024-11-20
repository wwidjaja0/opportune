import Company from "src/models/Company";
import asyncHandler from "express-async-handler";
import createHttpError from "http-errors";

// @desc Get companies matching the query
// @route GET /api/companies
// @access Private
export const getCompanies = asyncHandler(async (req, res, next) => {
  const { page, perPage, query, state } = req.body;
});

// @desc Create a new company
// @route POST /api/companies
// @access Private
export const createCompany = asyncHandler(async (req, res, next) => {
  const { name, city, state } = req.body;
});

// @desc Get company by ID
// @route GET /api/companies/:id
// @access Private
export const getCompanyById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
});

// @desc Update company by ID
// @route PATCH /api/companies/:id
// @access Private
export const updateCompany = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name, city, state } = req.body;
});

// @desc Delete company by ID
// @route DELETE /api/companies/:id
// @access Private
export const deleteCompany = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
});
