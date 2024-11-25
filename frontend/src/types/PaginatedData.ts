export interface PaginatedData<T> {
  page: number;
  perPage: number;
  total: number;
  data: T[];
}
