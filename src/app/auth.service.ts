import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000';  // Cambia la URL según tu API

  constructor(private http: HttpClient, private router: Router) { }

  // Método para el registro de usuarios
  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/usuarios/`, user);
  }

  login(credentials: { correo: string, password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login/`, credentials).pipe(
      tap((response: any) => {
        if (this.isBrowser()) {
          localStorage.setItem('access_token', response.access_token);
          localStorage.setItem('user_role', response.rol);
          localStorage.setItem('user_name', response.nombre); // Guarda el nombre del usuario
          localStorage.setItem('user_correo', response.correo); // Guarda el correo del usuario
        }
      })
    );
  }

  // Verifica si estamos en el navegador (y no en SSR o Node.js)
  isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }
  // Obtener el token desde localStorage
  getToken(): string | null {
    if (this.isBrowser()) {
      return localStorage.getItem('access_token');
    }
    return null;
  }
  // Guardar el token en el localStorage
  saveToken(token: string): void {
    localStorage.setItem('access_token', token);
  }


  // Método para verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

   // Obtener el rol del usuario desde localStorage
   getUserRole(): string | null {
    if (this.isBrowser()) {
      return localStorage.getItem('user_role');
    }
    return null;
  }
// Método para obtener el nombre del usuario desde localStorage
getUserName(): string | null {
  return this.isBrowser() ? localStorage.getItem('user_name') : null;
}
// Método para obtener el correo del usuario desde localStorage
getCorreo(): string | null {
  if (this.isBrowser()) {
    return localStorage.getItem('user_email');
  }
  return null;
}
   // Método para cerrar sesión y eliminar token, rol y correo
   logout(): void {
    if (this.isBrowser()) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('user_role');
      localStorage.removeItem('user_email');  // Elimina el correo del usuario
    }
    this.router.navigate(['/login']);  // Redirige al login después de cerrar sesión
  }
  obtenerPerfil(correo: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/usuarios/buscar_por_correo/${correo}`);
  }
  
  // Crear el perfil del usuario (nuevo usuario)
  crearPerfil(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/pacientes/`, data);
  }

    

  // Actualizar el perfil del usuario
  actualizarPerfil(data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/pacientes/`, data);
  }
}
