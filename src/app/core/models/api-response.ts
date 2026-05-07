import { HttpStatusCode } from '@angular/common/http';

export interface ProblemDetails
{
  title: string;
  detail: string;
}
export interface ApiResponse<T>
{
  isSuccess: boolean;
  statusCode: HttpStatusCode;
  problemDetail?: ProblemDetails;
  data?: T;
}
