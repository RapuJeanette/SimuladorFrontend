import { Component, EventEmitter, OnInit, Optional, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pacientes',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './pacientes.component.html',
  styleUrl: './pacientes.component.css'
})
export class PacientesComponent {
  pacientes: any[] = [];
  mostrarModal = false;
  nuevoPaciente = {
    usuario_id: '',
    telefono: '',
    direccion: '',
    fecha_nacimiento: '',
    carnet_identidad: '',
    sexo: ''
  };
  pacienteAEditar: any = null;
  pacienteIdEditable: string = '';
  mostrarModalEditar: boolean = false;

  @Output() usuarioSeleccionado = new EventEmitter<string>();

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.obtenerPacientes();
  }


  seleccionarPaciente(usuarioId: string) {
    this.usuarioSeleccionado.emit(usuarioId); // Emitir el usuario_id
  }

  obtenerPacientes() {
    this.http.get('https://simuladorbackend.onrender.com/pacientes/')
      .subscribe((response: any) => {
        this.pacientes = response;
      });
  }

  agregarPaciente() {
    this.http.post('https://simuladorbackend.onrender.com/pacientes/', this.nuevoPaciente)
      .subscribe(() => {
        this.obtenerPacientes();  // Actualizar la lista de doctores
        this.cerrarModal();
      });
  }

  editarPaciente() {
    this.http.put('https://simuladorbackend.onrender.com/pacientes/', this.pacienteAEditar)
      .subscribe(() => {
        this.obtenerPacientes();  // Actualizar la lista de doctores
        this.cerrarModal();
      });
  }

  eliminarPaciente(id: string) {
    this.http.delete(`http://127.0.0.1:8000/pacientes/${id}`)
      .subscribe(() => {
        this.obtenerPacientes();  // Actualizar la lista de doctores
      });
  }

  abrirModal() {
    this.mostrarModal = true;
  }

  abrirModalEditar(id: string) {
    this.pacienteIdEditable = id;
    this.mostrarModalEditar = true;
    const pacienteParaEditar = this.pacientes.find(paciente => paciente.id === id);
    if (pacienteParaEditar){
      this.pacienteAEditar = { ...pacienteParaEditar}
    }
  }

  // Función para cerrar el modal
  cerrarModal() {
    this.mostrarModal = false;
    this.mostrarModalEditar = false;
    this.nuevoPaciente = { usuario_id: '',telefono: '', direccion: '', fecha_nacimiento: '', carnet_identidad:'', sexo:'' };
  }
}
