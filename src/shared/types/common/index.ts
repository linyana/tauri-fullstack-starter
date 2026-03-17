export type IPaginationType = {
  current: number;
  limit: number;
  offset: number;
  totalCount: number;
};

export type IFilterType = {
  keyword?: string;
  limit?: number;
  offset?: number;
  sortBy?: string;
  orderBy?: string;
};
