import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';  // Importa Router para la redirección
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials = {
    correo: '',
    password: ''
  };

  errorMessage = '';  
  constructor(private authService: AuthService, private router: Router) {
      // Llamar al método logout al acceder a la página de login
      this.authService.logout();
   }

  // Método para hacer login
  login() {
    if (!this.credentials.correo || !this.credentials.password) {
      console.error('Correo y contraseña son obligatorios');
      return;
    }

    this.authService.login(this.credentials).subscribe(
      (response: any) => {
        console.log('Login exitoso:', response);

        // Guardar el token y rol en localStorage
        this.authService.saveToken(response.access_token);
        localStorage.setItem('user_role', response.rol);  // Guarda el rol en localStorage

        // Redirigir según el rol del usuario
        if (response.rol === 'admin') {
          this.router.navigate(['/admin-panel']);  // Redirigir a la vista de admin
        } else if (response.rol === 'paciente') {
          this.router.navigate(['/home-paciente']);  // Redirigir a la vista de home-paciente
        } else {
          this.router.navigate(['/home-page']);  // Redirige a home-page para otros roles
        }
      },
      (error: any) => {
        if (error.status === 404) {  // Supongamos que el servidor devuelve 404 si el correo no existe
          this.errorMessage = 'No existe cuenta con ese correo';
        } else if (error.status === 401) {
          this.errorMessage = 'Contraseña incorrecta';
        } else {
          this.errorMessage = 'Error al iniciar sesión. Intente nuevamente.';
        }
        console.error('Error en el login:', error);
      }
    );
  }

  // Método para redirigir al registro
  goToRegister() {
    this.router.navigate(['/registro']);
  }
  goToHome() {
    this.router.navigate(['/']);
  }
}
