import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {API_BASE_URL_PERSONEL_SERVICE, API_BASE_URL_APPROVAL_SERVICE} from '../../consts/api-constants';
import { CreatePersonelRequest } from '../models/personel/create-personel-request';
import { Personel, PersonelInfoModel } from '../models/personel';
import { CreateManagerResponse } from '../models/personel/manager-request';
import { PendingLeaveInfo } from '../models/leave/pending-leaves-info';

@Injectable({
  providedIn: 'root'
})
export class PersonelService {

  private readonly controllerUrl = API_BASE_URL_PERSONEL_SERVICE;
  private readonly approvalUrl = API_BASE_URL_APPROVAL_SERVICE;

  constructor(private http: HttpClient) {}

  getAllOfPersonelCount(): Observable<number> {
    return this.http.get<number>(
      `${this.controllerUrl}/GetAllOfPersonelCount`
    );
  }

  getAllPersonel(): Observable<Personel[]> {
    return this.http.get<Personel[]>(
      `${this.controllerUrl}/GetAllOfPersonel`
    );
  }

  createNewPersonel(payload: CreatePersonelRequest): Observable<Personel> {
    return this.http.post<Personel>(
      `${this.controllerUrl}/CreateNewPersonel`,
      payload
    );
  }

  getAllPersonelByDepartmentId(departmentId: number): Observable<Personel[]> {
    return this.http.get<Personel[]>(
      `${this.controllerUrl}/GetAllPersonelByDepartmentId/${departmentId}`
    );
  }

  assignManagerToDepartment(personelId: number, departmentId: number): Observable<CreateManagerResponse> {
    const body = {
      departmentId: departmentId,
      managerId: personelId
    };

    return this.http.post<CreateManagerResponse>(
      `${this.controllerUrl}/CreateNewManagerByGivenDepartmentId`,
      body
    );
  }
  getThePersonel(personelId: number): Observable<PersonelInfoModel> {
    return this.http.get<PersonelInfoModel>(
      `${this.controllerUrl}/personels/${personelId}`
    );
  }
  getPersonelsPendingList(managerId: number): Observable<PendingLeaveInfo[]> {
    return this.http.get<PendingLeaveInfo[]>(
      `${this.approvalUrl}/GetPendingLeavesListForApprovalByPersonelIdQuery/${managerId}`
    );
  }
  getManagerCount():Observable<number>
  {
    return this.http.get<number>(`${this.controllerUrl}/GetTheManagerCount`);
  }
  updateTheManager(managerId: number, departmentId: number): Observable<void> {
    return this.http.put<void>(
      `${this.controllerUrl}/UpdateTheManager`,
      null,
      {
        params: {
          managerId: managerId,
          departmentId: departmentId
        }
      }
    );
  }

  deleteThePersonel( personelId:number)
  {
    return this.http.delete(`${this.controllerUrl}/DeleteThePersonel/${personelId}`);
  }
}
