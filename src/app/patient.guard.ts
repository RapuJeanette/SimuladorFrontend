import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';  // Importar AuthService

@Injectable({
  providedIn: 'root'
})
export class PatientGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const userRole = this.authService.getUserRole();  // Obtener el rol del usuario desde el AuthService

    // Verificar si el rol es paciente
    if (userRole === 'paciente') {
      return true;  // Permitir el acceso si el rol es paciente
    }

    // Si no es paciente, eliminar el token y redirigir al login
    this.authService.logout();
    this.router.navigate(['/login']);
    return false;  // Bloquear el acceso si no es paciente
  }
}
