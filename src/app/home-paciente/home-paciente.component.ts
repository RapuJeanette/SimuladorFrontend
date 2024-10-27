import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home-paciente',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-paciente.component.html',
  styleUrl: './home-paciente.component.css'
})
export class HomePacienteComponent {
  isUserMenuOpen = false;
  correoDelUsuario: string | null = '';
  constructor(private router: Router, private authService: AuthService) {
    
  }
  toggleUserMenu() {
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }

  crearImagen3D() {
    this.router.navigate(['/crear-imagen']);
  }

  ngOnInit(): void {
    // Obteniendo el correo desde localStorage
    this.correoDelUsuario = localStorage.getItem('user_email');
  }

  // Método para redirigir al perfil de edición
  editarPerfil() {
    if (this.correoDelUsuario) {
      this.router.navigate(['/editar-perfil', this.correoDelUsuario]);
    } else {
      console.error("Correo no encontrado. Redirigiendo al inicio de sesión.");
      this.router.navigate(['/login']);
    }
  }

  buscarProfesional() {
    this.router.navigate(['/buscar-profesional']);
  }
  
  navigateTo(route: string) {
    this.router.navigate([route]);
  }
  logout() {
    // Lógica de cierre de sesión
    this.router.navigate(['/login']);
  }
}
