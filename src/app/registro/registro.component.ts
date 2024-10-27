import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';  // Importa CommonModule para habilitar *ngIf

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule],  // Asegúrate de importar CommonModule aquí
  providers: [AuthService],  // Proveer AuthService aquí
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  nuevoUsuario = {
    nombre: '',
    correo: '',
    password: ''
  };
  errorMessage = '';  // Variable para almacenar el mensaje de error

  constructor(private authService: AuthService, private router: Router) { }

  // Método para registrar un nuevo usuario
  registrar() {
    if (!this.nuevoUsuario.nombre || !this.nuevoUsuario.correo || !this.nuevoUsuario.password) {
      console.error('Todos los campos son obligatorios');
      return;
    }

    // Usar el servicio AuthService para manejar la lógica de registro
    this.authService.register(this.nuevoUsuario).subscribe(
      (response: any) => {
        console.log('Usuario registrado exitosamente:', response);
        // Redirige al login si el registro fue exitoso
        this.router.navigate(['/login']);
      },
      (error: any) => {
        if (error.status === 400) {  // Suponiendo que el backend envía un 409 cuando el correo ya está en uso
          this.errorMessage = 'Correo ya registrado';
        } else {
          this.errorMessage = 'Hubo un error al registrar. Intente nuevamente.';
        }
        console.error('Error al registrar usuario:', error);
      }
    );
  }

  // Método para redirigir al login
  goToLogin() {
    this.router.navigate(['/login']);
  }
}
