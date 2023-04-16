export interface ApiResponse<T> {
  status: number;
  data: T,
  message: string;
}


export interface DataResponse {
  accountIds: Record<string, string>;
  accountGroups: Record<string, string[]>;
  groups: ({name:string, networks: string[]})[];
}
