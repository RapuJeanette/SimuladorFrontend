import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms'
import { AppComponent } from "../app.component";

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule, AppComponent],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})

export class RegistroComponent {
  nuevoUsuario = {
    nombre: '',
    correo: '',
    password: ''
  };
  constructor(private http: HttpClient) { }

  async registrar() {
    if (!this.nuevoUsuario.nombre || !this.nuevoUsuario.correo || !this.nuevoUsuario.password) {
      console.error('Todos los campos son obligatorios');
      return;
    }

    try {
      const response = await this.http.post('http://127.0.0.1:8000/usuarios/', this.nuevoUsuario, {
        headers: { 'Content-Type': 'application/json' }
      }).toPromise();
      console.log('Usuario registrado:', response);
    } catch (error) {
      console.error('Error al registrar usuario:', error);
    }
  }

}
