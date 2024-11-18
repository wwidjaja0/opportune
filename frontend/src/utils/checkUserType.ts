import { Alumni, Student, User } from "../types/User";

export function isStudent(user: User): user is Student {
  return user.type === "student" && "classLevel" in user && "major" in user;
}

export function isAlumni(user: User): user is Alumni {
  return user.type === "alumni" && "company" in user && "shareProfile" in user;
}
