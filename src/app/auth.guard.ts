import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const userRole = this.authService.getUserRole();

    // Permitir el acceso solo si el rol es admin
    if (userRole === 'admin') {
      return true;  // Permitir el acceso
    }

    // Si no es admin, redirigir al login
    this.router.navigate(['/login']);
    return false;  // Bloquear el acceso
  }
}
