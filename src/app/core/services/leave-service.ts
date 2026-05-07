import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL_LEAVE_SERVICE } from '../../consts/api-constants';
import {Leave, CreateLeaveRequest, LeaveListResponse, UpdateLeaveRequest} from '../models/leave/leave';
import { LeaveSummary } from '../models/leave/leave-summary';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {

  private readonly controllerUrl = `${API_BASE_URL_LEAVE_SERVICE}`;

  constructor(private http: HttpClient) {}

  getLeaveSummaryByPersonelId(personelId: number): Observable<LeaveSummary> {
    return this.http.get<LeaveSummary>(
      `${this.controllerUrl}/GetPersonelLeaveInfo/${personelId}`
    );
  }

  createLeave(payload: CreateLeaveRequest): Observable<Leave> {
    return this.http.post<Leave>(
      `${this.controllerUrl}/CreateNewLeave`,
      payload
    );
  }
  getAcceptedLeaveList(personelId:number):Observable<LeaveListResponse>
  {
    return this.http.get<LeaveListResponse>(`${this.controllerUrl}/GetAcceptedLeavesByPersonelIdQuery/${personelId}`)
  }
  getPendingLeaveList(personelId:number):Observable<LeaveListResponse>
  {
    return this.http.get<LeaveListResponse>(`${this.controllerUrl}/GetPendingLeavesByPersonelIdQuery/${personelId}`)
  }

  getRejectedLeaveList(personelId:number):Observable<LeaveListResponse>
  {
    return this.http.get<LeaveListResponse>(`${this.controllerUrl}/GetRejectedLeavesByPersonelIdQuery/${personelId}`)
  }
  updateTheLeave(leaveId: number, request: UpdateLeaveRequest): Observable<any> {
    return this.http.put(
      `${API_BASE_URL_LEAVE_SERVICE}/UpdateTheLeave/${leaveId}`,
      request
    );
  }



}
