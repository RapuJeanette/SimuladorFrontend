import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AdminPanelComponent } from "./admin-panel/admin-panel.component";
import { AuthService } from './auth.service';  // Asegúrate de inyectar AuthService

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AdminPanelComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(private router: Router, private authService: AuthService) {}

  // Método para verificar si el panel de admin debe estar visible
  isAdminPanelVisible(): boolean {
    const userRole = this.authService.getUserRole();  // Obtener el rol del usuario

    // Ocultar el panel en la página de login o registro y si el rol no es admin
    const excludedRoutes = ['/login', '/registro'];
    return !excludedRoutes.includes(this.router.url) && userRole === 'admin';
  }
}
