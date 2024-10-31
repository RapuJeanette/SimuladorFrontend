import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-doctor',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './doctor.component.html',
  styleUrl: './doctor.component.css'
})
export class DoctorComponent implements OnInit {
  doctores: any[] = [];
  mostrarModal = false;
  nuevoDoctor = {
    nombre: '',
    correo: '',
    telefono: '',
    especialidad: '',
    disponibilidad: ''
  };
  doctorAEditar: any = null;
  doctorIdEditable: string = '';
  mostrarModalEditar: boolean = false;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.obtenerDoctores();
  }

  obtenerDoctores() {
    this.http.get('https://simuladorbackend.onrender.com/doctores/')
      .subscribe((response: any) => {
        this.doctores = response;
      });
  }

  agregarDoctor() {
    this.http.post('https://simuladorbackend.onrender.com/doctores/', this.nuevoDoctor)
      .subscribe(() => {
        this.obtenerDoctores();  // Actualizar la lista de doctores
        this.cerrarModal();
      });
  }

  editarDoctor(id: string) {
    this.http.put(`http://127.0.0.1:8000/doctores/${id}`, this.doctorAEditar)
      .subscribe(() => {
        this.obtenerDoctores();  // Actualizar la lista de doctores
        this.cerrarModal();
      });
  }

  eliminarDoctor(id: string) {
    this.http.delete(`https://simuladorbackend.onrender.com/doctores/${id}`)
      .subscribe(() => {
        this.obtenerDoctores();  // Actualizar la lista de doctores
      });
  }

  abrirModal() {
    this.mostrarModal = true;
  }

  abrirModalEditar(id: string) {
    this.doctorIdEditable = id;
    this.mostrarModalEditar = true;
    const doctorParaEditar = this.doctores.find(doctor => doctor.id === id);
    if (doctorParaEditar){
      this.doctorAEditar = { ... doctorParaEditar}
    }
  }

  // Función para cerrar el modal
  cerrarModal() {
    this.mostrarModal = false;
    this.mostrarModalEditar = false;
    this.nuevoDoctor = { nombre: '', correo: '',telefono: '', especialidad: '', disponibilidad: '' };
  }


}
