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
  correo: string | null = null;
  constructor(private router: Router, private authService: AuthService) {

  }
  toggleUserMenu() {
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }

  crearImagen3D() {
    this.router.navigate(['/seleccion-parte']);
  }

  ngOnInit(): void {
    this.correo = localStorage.getItem('user_correo');
    if (!this.correo) {
      console.warn('Correo no encontrado. Redirigiendo al inicio de sesión.');
      this.router.navigate(['/login']);
    }
  }
  editarPerfil(): void {
    this.router.navigate(['home-paciente/editar-perfil']); // Redirige a la vista de edición de perfil
  }
  verHistorial(): void {
    this.router.navigate(['historial']); // Redirige a la vista de edición de perfil
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
