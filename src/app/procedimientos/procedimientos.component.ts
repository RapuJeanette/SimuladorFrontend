import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-procedimientos',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './procedimientos.component.html',
  styleUrl: './procedimientos.component.css'
})
export class ProcedimientosComponent implements OnInit {
  procedimientos: any[] = [];
  mostrarModal: boolean = false;
  private apiUrl = 'https://simuladorbackend.onrender.com/estado_simulaciones';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.cargarProcedimientos();
  }

  cargarProcedimientos(): void {
    this.http.get<any[]>(`${this.apiUrl}/`).subscribe(
      (data) => {
        this.procedimientos = data;
      },
      (error) => {
        console.error('Error al cargar los procedimientos:', error);
        alert('No se pudieron cargar los procedimientos.');
      }
    );
  }

  eliminarProcedimiento(id: string): void {
    if (confirm('¿Estás seguro de que deseas eliminar este procedimiento?')) {
      this.http.delete<{ mensaje: string }>(`${this.apiUrl}/${id}`).subscribe(
        (response) => {
          alert(response.mensaje);
          this.cargarProcedimientos(); // Recargar la lista
        },
        (error) => {
          console.error('Error al eliminar el procedimiento:', error);
          alert('No se pudo eliminar el procedimiento.');
        }
      );
    }
  }
}
