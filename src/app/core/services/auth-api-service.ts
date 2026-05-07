import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL_PERSONEL_SERVICE } from '../../consts/api-constants';

export interface LoginResponse
{
  token: string;
  role: 'admin' | 'manager' | 'personel';
  personelId?: number;
  email?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {
  private readonly controllerUrl = `${API_BASE_URL_PERSONEL_SERVICE}/auth`;

  constructor(private http: HttpClient) {}

  login(payload: { username?: string; password?: string; email?: string; role: 'admin' | 'manager' | 'personel'; }): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      `${this.controllerUrl}/login`,
      payload
    );
  }
}
