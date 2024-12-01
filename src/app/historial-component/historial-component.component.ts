import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-historial-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './historial-component.component.html',
  styleUrl: './historial-component.component.css'
})
export class HistorialComponentComponent implements OnInit{
  historialAntes: any[] = [];
  historialDespues: any[] = [];
  modeloSeleccionadoId: string | null = null;

  private apiUrl = 'http://localhost:8000/estado_simulaciones/'; // Cambia esta URL si es necesario

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.cargarHistorial();
  }

  cargarHistorial(): void {
    this.http.get<any[]>(this.apiUrl).subscribe((data) => {
      this.historialAntes = data.filter((modelo) => modelo.tipo_estado === 'antes');
      this.historialDespues = data.filter((modelo) => modelo.tipo_estado === 'despues');
    });
  }

  obtenerFechaFormateada(fecha: Date): string {
    return new Date(fecha).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  verDetalle(id: string): void {
    this.modeloSeleccionadoId = id;
    console.log('Detalle del modelo con ID:', id);
    // Aquí puedes implementar la lógica para redirigir o cambiar la vista al detalle
  }

}
