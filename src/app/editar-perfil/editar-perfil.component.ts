import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-editar-perfil',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.css']
})
export class EditarPerfilComponent implements OnInit {
  pacienteData = {
    correo: '',
    telefono: '',
    direccion: '',
    fecha_nacimiento: '',
    carnet_identidad: '',
    sexo: ''
  };

  showAlert = false; 
  isNewProfile: boolean = true;
  isUserMenuOpen = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const correo = this.authService.getCorreo();
    if (!correo) {
      console.error('No se encontró el correo en el almacenamiento. Redirigiendo a inicio de sesión.');
      this.router.navigate(['/login']);
      return;
    }
    
    this.pacienteData.correo = correo;
    this.cargarDatosUsuario();
  }
  mostrarAlerta() {
    this.showAlert = true;
    setTimeout(() => {
      this.showAlert = false;
      this.router.navigate(['/home-paciente']); // Redirige al home después de actualizar
    }, 2000);
  }
  cargarDatosUsuario() {
    this.authService.getPacientePorCorreo(this.pacienteData.correo).subscribe(
      (response: any) => {
        if (response && response.paciente) {
          const paciente = response.paciente;
          this.pacienteData = {
            ...this.pacienteData,
            telefono: paciente.telefono,
            direccion: paciente.direccion,
            fecha_nacimiento: paciente.fecha_nacimiento.split('T')[0],
            carnet_identidad: paciente.carnet_identidad,
            sexo: paciente.sexo
          };
          this.isNewProfile = false;
        } else {
          this.isNewProfile = true;
        }
      },
      (error: any) => {
        console.error('Error al cargar los datos del usuario:', error);
        this.isNewProfile = error.status === 404; // Verifica si el perfil no existe
      }
    );
  }

  guardarPerfil() {
    if (this.isNewProfile) {
      this.authService.crearPaciente(this.pacienteData).subscribe(
        () => {
          alert('Datos guardados exitosamente.');
          this.router.navigate(['/home-paciente']);
        },
        (error) => console.error('Error al crear el paciente:', error)
      );
    } else {
      this.authService.actualizarPaciente(this.pacienteData).subscribe(
        () => {
          alert('Datos actualizados exitosamente.');
          this.router.navigate(['/home-paciente']);
        },
        (error) => console.error('Error al actualizar el paciente:', error)
      );
    }
  }

  crearPaciente() {
    this.authService.crearPaciente(this.pacienteData).subscribe(
      (response: any) => console.log("Paciente creado exitosamente:", response),
      (error: any) => console.error("Error al crear el paciente:", error)
    );
  }

  actualizarPaciente() {
    this.authService.actualizarPaciente(this.pacienteData).subscribe(
      (response: any) => console.log("Paciente actualizado exitosamente:", response),
      (error: any) => console.error("Error al actualizar el paciente:", error)
    );
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  goToHomePaciente() {
    this.router.navigate(['/home-paciente']);
  }
  toggleUserMenu(): void {
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }
}
