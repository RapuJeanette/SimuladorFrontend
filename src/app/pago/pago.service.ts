import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PagoService {
  private apiUrl = 'http://127.0.0.1:8000/pagos'; // Cambia según tu configuración

  constructor(private http: HttpClient) { }

  getPagos(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  // Agregar nuevo pago
  agregarPago(pago: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, pago);
  }
}
