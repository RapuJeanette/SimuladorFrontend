import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000';  // Cambia la URL según tu API

  constructor(private http: HttpClient) { }

  // Método para el registro de usuarios
  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/usuarios/`, user);
  }

  // Método para hacer login
  login(credentials: { correo: string, password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login/`, credentials).pipe(
      tap((response: any) => {
        if (this.isBrowser()) {
          localStorage.setItem('access_token', response.access_token);
          localStorage.setItem('user_role', response.rol);
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

  // Cerrar sesión y eliminar el token
  // Cerrar sesión
  logout(): void {
    if (this.isBrowser()) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('user_role');
    }
  }
}
