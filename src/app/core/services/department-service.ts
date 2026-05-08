import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {API_BASE_URL_PERSONEL_SERVICE} from '../../consts/api-constants';
import { CreateDepartmentRequest } from '../models/create-department-request';
import { ApiResponse } from '../models/api-response';
import {Department } from '../models/department'
@Injectable({providedIn: 'root'}) // Bu sınıf bir servistir, bunu sen oluştur ve ihtiyacım olan yerde bana ver
export class DepartmentService
{
  private readonly controllerUrl = `${API_BASE_URL_PERSONEL_SERVICE}`;

  constructor(private http: HttpClient) {}

  createDepartment(payload: CreateDepartmentRequest): Observable<ApiResponse<any>>
  {
    return this.http.post<ApiResponse<any>>(
      `${this.controllerUrl}/CreateNewDepartment`,
      payload
    );
  }

  getAllDepartment():Observable<Department[]>
  {
    return this.http.get<Department[]>(`${this.controllerUrl}/GetAllDepartmentWithDepartmentName`);
  }

  getAllOfDepartmentCount(): Observable<number>
  {
    return this.http.get<number>(`${this.controllerUrl}/GetAllOfDepartmentCount`);
  }

  deleteTheManagerByDepartmentId(departmentId:number)
  {
    return this.http.delete(`${this.controllerUrl}/DeleteTheManager/${departmentId}`);
  }

}
