import { Component } from '@angular/core';
import { Router, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './core/services/auth-service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  constructor(private router: Router, private authService: AuthService) {}

  isLoginPage(): boolean
  {
    return this.router.url.includes('login');
  }

  isPersonelPage(): boolean {
    return this.router.url.includes('personel');
  }

  isManagerPage(): boolean {
    return this.router.url.includes('manager');
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
