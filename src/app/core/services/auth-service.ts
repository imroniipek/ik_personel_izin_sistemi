import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

export interface AuthUser
{
  token: string;
  role: 'admin' | 'manager' | 'personel';
  personelId?: number;
  email?: string;
}
@Injectable({providedIn: 'root'})

export class AuthService {
  private readonly storageKey = 'authUser';

  constructor(private router: Router) {}

  setUser(user: AuthUser): void
  {
    localStorage.setItem(this.storageKey, JSON.stringify(user));
  }

  getUser(): AuthUser | null
  {
    const data = localStorage.getItem(this.storageKey);
    if (!data) {return null;}
    return JSON.parse(data) as AuthUser;
  }

  getPersonelId(): number
  {
    return this.getUser()?.personelId ?? 0;
  }


  logout(): void
  {
    localStorage.removeItem(this.storageKey);
    this.router.navigate(['/login']);
  }
}
