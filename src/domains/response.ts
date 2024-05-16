export interface DataResponse<D> {
  data: D;
}

export type ListResponse<D> = DataResponse<D[]>;

export type PaginationResponse<D> = ListResponse<D> & {
  pagination: Pagination;
}

export interface Pagination {
  index: number;
  pageSize: number;
  totalCount: number;
}
