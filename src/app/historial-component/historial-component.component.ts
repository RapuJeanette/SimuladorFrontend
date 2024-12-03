import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-historial-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './historial-component.component.html',
  styleUrl: './historial-component.component.css'
})
export class HistorialComponentComponent implements OnInit {
  simulaciones: any[] = [];
  paciente_id: string = '';

  constructor(
    private http: HttpClient,  // Inyectar HttpClient para hacer solicitudes
    private router: Router ,
    private location: Location // Inyectar Router para navegar entre rutas
  ) {}

  ngOnInit(): void {
    this.obtenerPacienteId();  // Obtener el paciente_id cuando se inicialice el componente
  }

  obtenerPacienteId(): void {
    const usuarioCorreo = localStorage.getItem('user_correo'); // Obtener el correo del usuario desde localStorage

    if (!usuarioCorreo) {
        console.error('Correo de usuario no encontrado');
        return;
    }

    const apiUrl = `https://simuladorbackend.onrender.com/pacientes`; // Endpoint para obtener todos los pacientes
    this.http.get<any[]>(apiUrl).subscribe(
        (pacientes) => {
            // Buscar el paciente cuyo usuario_id coincida con el correo almacenado
            const pacienteEncontrado = pacientes.find(paciente => paciente.usuario_id === usuarioCorreo);

            if (pacienteEncontrado) {
                this.paciente_id = pacienteEncontrado.id; // Asignar el id del paciente
                this.obtenerSimulaciones(); // Obtener las simulaciones del paciente
            } else {
                console.error('No se encontró un paciente con este correo');
            }
        },
        (error) => {
            console.error('Error al obtener pacientes:', error); // Manejo de errores
        }
    );
}


  // Método para obtener las simulaciones del paciente desde el backend
  obtenerSimulaciones(): void {
    if (!this.paciente_id) {
      console.error('No se encontró el paciente_id');
      return;
    }
    console.log(this.paciente_id);
    // Realizar la solicitud GET para obtener las simulaciones del paciente
    const apiUrl = `https://simuladorbackend.onrender.com/pacientes/${this.paciente_id}/simulaciones`;
    this.http.get<any[]>(apiUrl).subscribe(
      (simulaciones) => {
        this.simulaciones = simulaciones;  // Asignar las simulaciones obtenidas a la variable
      },
      (error) => {
        console.error('Error al obtener las simulaciones:', error);  // Manejo de errores
      }
    );
  }

  // Método para ver los detalles de una simulación (opcional)
  verDetallesSimulacion(simulacionId: string): void {
    console.log('Simulación ID:', simulacionId);
    this.router.navigate(['/antesdespues', simulacionId]);
    // Aquí puedes agregar la lógica para navegar o mostrar los detalles de la simulación
  }

  goBack(): void {
    this.location.back();
  }

}
