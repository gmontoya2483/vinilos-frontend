export interface Pagination {
  previousPage: null;
  currentPage: number;
  nextPage: null;
  totalPages: number;
  pageSize: number;
  pages: number[];
  showing: Showing;
}

export interface Showing {
  from: number;
  to: number;
  of: number;
}
