import { Company } from "./Company";

export type UserType = "student" | "alumni";
export type ClassLevel =
  | "freshmen"
  | "sophomore"
  | "junior"
  | "senior"
  | "other";

export interface User {
  _id: string;
  email: string;
  name: string;
  type: UserType;
  linkedIn?: string;
  phoneNumber?: string;
}

export interface Student extends User {
  major: string;
  classLevel: ClassLevel;
}

export interface Alumni extends User {
  company: Company;
  shareProfile: boolean;
}

export interface UserJSON {
  _id: string;
  email: string;
  name: string;
  type: UserType;
  linkedIn?: string;
  phoneNumber?: string;
  major?: string;
  classLevel?: ClassLevel;
  company?: Company;
  shareProfile?: boolean;
}

export interface CreateUserRequest {
  _id: string;
  email: string;
  name: string;
  type: UserType;
  linkedIn?: string;
  phoneNumber?: string;
  major?: string;
  classLevel?: ClassLevel;
  company?: Company;
  shareProfile?: boolean;
}

export interface UpdateUserRequest {
  type?: UserType;
  linkedIn?: string;
  phoneNumber?: string;
  major?: string;
  classLevel?: ClassLevel;
  company?: Company;
  shareProfile?: boolean;
}

export interface GetAlumniQuery {
  page: number;
  perPage: number;
  query?: string;
}
