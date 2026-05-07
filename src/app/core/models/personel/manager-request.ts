export interface CreateManagerRequest
{
  departmentId: number;
  managerId: number;
}

export interface CreateManagerResponse {
  departmentId: number;
  departmentName: string;
  personelId: number;
  personelName: string;
}
