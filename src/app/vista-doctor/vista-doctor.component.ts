import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-vista-doctor',
  standalone: true,
  imports: [ CommonModule, FormsModule ],
  templateUrl: './vista-doctor.component.html',
  styleUrl: './vista-doctor.component.css'
})
export class VistaDoctorComponent implements OnInit {
  mostrarModalCrear: boolean = false;
  nuevaCita: any = {
    paciente_id: '', // Aquí se almacenará el correo del usuario
    fecha: '',
    estado: 'reservado',
    doctor_id: 'Jorge Montero' // Valor estático para este doctor
  };
  mensaje: string = '';
  mensajeExito: boolean = true

  constructor(private http: HttpClient, private location: Location) {}

  ngOnInit() {
    // Obtener el correo del usuario almacenado en localStorage al iniciar el componente
    const userCorreo = localStorage.getItem('user_correo');
    if (userCorreo) {
      this.nuevaCita.paciente_id = userCorreo;
    } else {
      console.error('No se encontró el correo del usuario en localStorage.');
    }
  }
  
  volverAtras() {
    this.location.back(); // Navega a la vista anterior
  }

  abrirModalCrear() {
    this.mostrarModalCrear = true;
  }

  cerrarModalCrear() {
    this.mostrarModalCrear = false;
  }

  crearCita() {
    if (!this.nuevaCita.fecha) {
      alert('Por favor, selecciona una fecha para la cita.');
      return;
    }

    this.http.post('https://simuladorbackend.onrender.com/citas/', this.nuevaCita).subscribe(
      () => {
        this.mostrarMensaje('Cita reservada con éxito.', true);
        this.cerrarModalCrear();
        this.limpiarFormulario();
      },
      (error) => {
        console.error('Error al reservar la cita:', error);
        this.mostrarMensaje('Ocurrió un error al reservar la cita. Por favor, inténtalo nuevamente.', false);
      }
    );
  }

  mostrarMensaje(texto: string, exito: boolean) {
    this.mensaje = texto;
    this.mensajeExito = exito;

    // Ocultar el mensaje después de 5 segundos
    setTimeout(() => {
      this.mensaje = '';
    }, 5000);
  }

  limpiarFormulario() {
    this.nuevaCita = {
      paciente_id: '',
      fecha: '',
      estado: 'reservado',
      doctor_id: 'Jorge Montero'
    };
  }
}
