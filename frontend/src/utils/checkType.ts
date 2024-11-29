import { PaginatedData } from "../types/PaginatedData";
import { Alumni, Student, User, UserType } from "../types/User";

export function isStudent(user: User): user is Student {
  return user.type === UserType.Student;
}

export function isAlumni(user: User): user is Alumni {
  return user.type === UserType.Alumni;
}

export function isPaginatedData<T>(
  response: unknown,
): response is PaginatedData<T> {
  return (
    typeof response === "object" &&
    response !== null &&
    "data" in response &&
    "total" in response &&
    Array.isArray((response as PaginatedData<T>).data) &&
    typeof (response as PaginatedData<T>).total === "number"
  );
}
