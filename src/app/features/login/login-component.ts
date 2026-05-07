import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PersonelService } from '../../core/services/personel-service';
import { AuthService } from '../../core/services/auth-service';
import {AuthApiService} from '../../core/services/auth-api-service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login-component.html',
  styleUrl: './login-component.css'
})
export class LoginComponent {
  role: 'admin' | 'manager' | 'personel' = 'admin';

  username = '';
  password = '';
  email = '';

  errorMessage = '';

  constructor(private personelService: PersonelService, private authService: AuthService, private router: Router,private authapiService:AuthApiService) {}

  login(): void
  {
    this.errorMessage = '';

    if (this.role === 'admin')
    {
      this.adminLogin();
      return;
    }

    if (this.role === 'manager') {
      this.managerLogin();
      return;
    }

    this.personelLogin();
  }

  private adminLogin(): void {
    this.authapiService.login({
      username: this.username,
      password: this.password,
      role: 'admin'
    }).subscribe({
      next: (response) => {
        this.authService.setUser(response);
        this.router.navigate(['/dashboard']);
      },
      error: () => {
        this.errorMessage = 'Admin kullanıcı adı veya şifre hatalı.';
      }
    });
  }

  private personelLogin(): void
  {
    if (!this.email.trim())
    {
      this.errorMessage = 'Email boş olamaz.';
      return;
    }

    this.authapiService.login({
      email: this.email,
      role: 'personel'
    }).subscribe({
      next: (response) => {
        this.authService.setUser(response);
        this.router.navigate(['/personel']);
      },
      error: () => {
        this.errorMessage = 'Bu email ile kayıtlı personel bulunamadı.';
      }
    });
  }

  private managerLogin(): void {
    if (!this.email.trim()) {
      this.errorMessage = 'Email boş olamaz.';
      return;
    }

    this.authapiService.login({
      email: this.email,
      role: 'manager'
    }).subscribe({
      next: (response) => {
        this.authService.setUser(response);
        this.router.navigate(['/manager']);
      },
      error: () => {
        this.errorMessage = 'Bu email ile kayıtlı manager bulunamadı.';
      }
    });
  }
}
