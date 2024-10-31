import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-citas',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './citas.component.html',
  styleUrl: './citas.component.css'
})
export class CitasComponent implements OnInit {
  citas: any[] = [];
  pacientes: any[] = [];
  doctores: any[] = [];
  mostrarModal = false;
  mostrarModalEditar = false;
  nuevaCita = {
    paciente_id: '',
    fecha: '',
    estado: '',
    doctor_id: ''
  };
  citaIdEdicion: string | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.obtenerCitas();
    this.obtenerPacientes();
    this.obtenerDoctores();
  }

  obtenerCitas() {
    this.http.get('http://localhost:8000/citas/').subscribe((data: any) => {
      this.citas = data; // Almacena las citas en la variable
    });
  }

  obtenerPacientes() {
    this.http.get<any[]>('http://localhost:8000/pacientes/').subscribe(data => {
      this.pacientes = data; // Almacena los pacientes en la variable
    });
  }

  obtenerDoctores() {
    this.http.get<any[]>('http://localhost:8000/doctores/').subscribe(data => {
      this.doctores = data; // Almacena los doctores en la variable
    });
  }

  crearCita() {
    this.http.post('http://localhost:8000/citas/', this.nuevaCita).subscribe(()=> {
      this.obtenerCitas(); // Actualiza la lista de citas
      this.cerrarModalCrear();
      this.limpiarFormulario(); // Limpia el formulario
    });
  }
  // Método para editar una cita existente
  editarCita() {
  if (this.citaIdEdicion) {
    this.http.put(`http://localhost:8000/citas/${this.citaIdEdicion}`, this.nuevaCita).subscribe(
      response => {
        this.obtenerCitas(); // Actualiza la lista de citas
        this.cerrarModalEditar();
        this.limpiarFormulario(); // Limpia el formulario
      },
      error => {
        console.error('Error al actualizar la cita:', error);
      }
    );
  } else {
    console.error('ID de cita no disponible');
  }
}

  eliminarCita(citaId: string) {
    this.http.delete(`http://localhost:8000/citas/${citaId}`).subscribe(() => {
      this.obtenerCitas(); // Actualiza la lista de citas
    });
  }

  // Método para limpiar el formulario
  limpiarFormulario() {
    this.nuevaCita = {
      paciente_id: '',
      fecha: '',
      estado: '',
      doctor_id: ''
    };
  }

  abrirModalCrear() {
    this.mostrarModal = true;
    this.limpiarFormulario(); // Limpia el formulario al abrir el modal
  }

  cerrarModalCrear() {
    this.mostrarModal = false;
  }

  abrirModalEditar(id: string) {
    this.mostrarModalEditar = true;
    const citaParaEditar = this.citas.find(cita => cita.id === id);

    if (citaParaEditar) {
      this.citaIdEdicion = citaParaEditar.id; // Guarda el ID de la cita que se está editando
      this.nuevaCita = { ...citaParaEditar }; // Carga los datos de la cita en el formulario
    }
  }

  // Método para cerrar el modal de edición
  cerrarModalEditar() {
    this.mostrarModalEditar = false;
    this.citaIdEdicion = null; // Limpia el ID de edición
  }

}
