import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';  // Importa Router para la redirección

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials = {
    correo: '',
    password: ''
  };

  constructor(private authService: AuthService, private router: Router) { }

  // Método para hacer login
  login() {
    if (!this.credentials.correo || !this.credentials.password) {
      console.error('Correo y contraseña son obligatorios');
      return;
    }

    this.authService.login(this.credentials).subscribe(
      (response: any) => {
        console.log('Login exitoso:', response);

        // Guardar el token en localStorage
        this.authService.saveToken(response.access_token);

        // Redirigir según el rol del usuario
        if (response.rol === 'admin') {
          this.router.navigate(['/admin-panel']);
        } else if (response.rol === 'doctor') {
          this.router.navigate(['/dashboard/doctor']);
        } else {
          this.router.navigate(['/dashboard/paciente']);
        }
      },
      (error: any) => {
        console.error('Error en el login:', error);
      }
    );
  }

  // Método para redirigir al registro
  goToRegister() {
    this.router.navigate(['/registro']);
  }
}
