import {
  Alumni,
  CreateUserRequest,
  GetAlumniQuery,
  Student,
  UpdateUserRequest,
  UserJSON,
} from "../types/User";
import { isAlumni, isStudent } from "../utils/checkUserType";
import { APIResult, get, del, patch, post, handleAPIError } from "./requests";

function parseUser(user: UserJSON): Student | Alumni {
  if (isStudent(user)) {
    return { ...user }; // Safely return as Student
  } else if (isAlumni(user)) {
    return { ...user }; // Safely return as Alumni
  }
  throw new Error("Invalid user type");
}

function parseAlumni(user: UserJSON): Alumni {
  if (isAlumni(user)) {
    return { ...user }; // Safely return as Alumni
  }
  throw new Error("User is not an Alumni");
}

/**
 * Fetch all users from the backend.
 *
 * @returns A list of users
 */
export async function getUsers(): Promise<APIResult<(Student | Alumni)[]>> {
  try {
    const response = await get("/api/users");
    const json = (await response.json()) as UserJSON[];
    const users = json.map(parseUser);
    return { success: true, data: users };
  } catch (error) {
    return handleAPIError(error);
  }
}

/**
 * Fetch a single user by ID from the backend.
 *
 * @param id The ID of the user to fetch
 * @returns The user object
 */
export async function getUserById(
  id: string,
): Promise<APIResult<Student | Alumni>> {
  try {
    const response = await get(`/api/users/${id}`);
    const json = (await response.json()) as UserJSON;
    return { success: true, data: parseUser(json) };
  } catch (error) {
    return handleAPIError(error);
  }
}

export async function createUser(
  user: CreateUserRequest,
): Promise<APIResult<Student | Alumni>> {
  try {
    const response = await post("/api/users", user);
    const json = (await response.json()) as UserJSON;
    return { success: true, data: parseUser(json) };
  } catch (error) {
    return handleAPIError(error);
  }
}

export async function updateUser(
  id: string,
  user: UpdateUserRequest,
): Promise<APIResult<Student | Alumni>> {
  try {
    const response = await patch(`/api/users/${id}`, user);
    const json = (await response.json()) as UserJSON;
    return { success: true, data: parseUser(json) };
  } catch (error) {
    return handleAPIError(error);
  }
}

/**
 * Delete a user from the backend.
 *
 * @param id The ID of the user to delete
 * @returns A success message or error
 */
export async function deleteUser(id: string): Promise<APIResult<null>> {
  try {
    await del(`/api/users/${id}`);
    return { success: true, data: null };
  } catch (error) {
    return handleAPIError(error);
  }
}

/**
 * Fetch a single user by ID from the backend.
 *
 * @param id The ID of the user to fetch
 * @returns The user object
 */
export async function getAlumni(
  id: string,
  queries: GetAlumniQuery = { page: 0, perPage: 10 },
): Promise<APIResult<Alumni>> {
  try {
    const response = await get(`/api/users/${id}`, { ...queries });
    const json = (await response.json()) as UserJSON;
    return { success: true, data: parseAlumni(json) };
  } catch (error) {
    return handleAPIError(error);
  }
}
