import Company from "src/models/Company";
import { matchedData, validationResult } from "express-validator";
import asyncHandler from "express-async-handler";
import createHttpError from "http-errors";
import validationErrorParser from "src/util/validationErrorParser";

/*
interface BaseCompanyResponse {
  _id?: string;
  email: string;
  name: string;
  type: string;
}

type CompanyResponse = BaseCompanyResponse | undefined;
*/

// @desc Get companies matching the query
// @route GET /api/companies
// @access Private
export const getCompanies = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(createHttpError(400, validationErrorParser(errors)));
  }

  const { page, perPage, query, state } = matchedData(req);

  // Begin query
  const dbQuery = Company.find();

  // Search by name if provided
  if (query !== "") {
    dbQuery.where("name").regex(new RegExp(query, "i"));
  }

  // Filter by state if provided
  if (state !== "all") {
    dbQuery.where("state").equals(state);
  }

  // Duplicate before pagination to get total count
  const countQuery = dbQuery.clone().countDocuments();

  // Paginate
  dbQuery.skip(page * perPage).limit(perPage);

  // Execute both queries in parallel
  const [total, companies] = await Promise.all([
    countQuery.countDocuments().exec(),
    dbQuery
      .skip(page * perPage)
      .limit(perPage)
      .lean()
      .exec(),
  ]);

  // Return 404 if no companies are found
  if (companies.length === 0) {
    return next(createHttpError(404, "No companies found"));
  }

  res.status(200).json({
    page,
    perPage,
    total,
    data: companies,
  });
});

// @desc Create a new company
// @route POST /api/companies
// @access Private
export const createCompany = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(createHttpError(400, validationErrorParser(errors)));
  }

  const { name, city, state } = matchedData(req);

  // Check if company already exists with case insensitive exact match regex
  const foundCompany = await Company.findOne({
    name: { $regex: `^${name}$`, $options: "i" },
  })
    .lean()
    .exec();

  if (foundCompany) {
    return next(createHttpError(409, "Company already exists"));
  }

  const newCompany = new Company({ name, city, state });
  await newCompany.save();

  res.status(201).json(newCompany);
});

// @desc Get company by ID
// @route GET /api/companies/:id
// @access Private
export const getCompanyById = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(createHttpError(400, validationErrorParser(errors)));
  }

  const { id } = matchedData(req);

  const company = await Company.findById(id).lean().exec();

  if (!company) {
    return next(createHttpError(404, "Company not found"));
  }

  res.status(200).json(company);
});

// @desc Update company by ID
// @route PATCH /api/companies/:id
// @access Private
export const updateCompany = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(createHttpError(400, validationErrorParser(errors)));
  }

  const { id, name, city, state } = matchedData(req);

  // Check if at least one field to update is provided
  if (!name && !city && !state) {
    return next(
      createHttpError(400, "At least one field to update is required"),
    );
  }

  // Check if company exists
  const company = await Company.findById(id).exec();
  if (!company) {
    return next(createHttpError(404, "Company not found"));
  }

  // Update company fields if provided
  company.name = name || company.name;
  company.city = city || company.city;
  company.state = state || company.state;

  const updatedCompany = await company.save();

  res.status(200).json(updatedCompany);
});

// @desc Delete company by ID
// @route DELETE /api/companies/:id
// @access Private
export const deleteCompany = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(createHttpError(400, validationErrorParser(errors)));
  }

  const { id } = matchedData(req);

  const company = await Company.findByIdAndDelete(id).lean().exec();

  // Return 404 if company not found
  if (!company) {
    return next(createHttpError(404, "Company not found"));
  }

  res.status(200).send();
});
