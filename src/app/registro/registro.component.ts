import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';  // Importa HttpClientModule
import { AuthService } from '../auth.service';  // Importa AuthService
import { FormsModule } from '@angular/forms';  // FormsModule para el formulario
import { Router } from '@angular/router';  // Importa Router para la redirección

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule, HttpClientModule],  // Asegúrate de importar HttpClientModule
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

  constructor(private authService: AuthService,private router:Router) { }

  // Método para registrar un nuevo usuario
  registrar() {
    if (!this.nuevoUsuario.nombre || !this.nuevoUsuario.correo || !this.nuevoUsuario.password) {
      console.error('Todos los campos son obligatorios');
      return;
    }

    // Usar el servicio AuthService para manejar la lógica de registro
    this.authService.register(this.nuevoUsuario).subscribe(
      (response: any) => {  // Especificar que la respuesta tiene tipo 'any'
        console.log('Usuario registrado exitosamente:', response);
      },
      (error: any) => {  // Especificar que el error tiene tipo 'any'
        console.error('Error al registrar usuario:', error);
      }
    );
  }
  //Metodo para redirigir al login
  goToLogin() {
    this.router.navigate(['/login']);
}
}
