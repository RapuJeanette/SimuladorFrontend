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
    usuario_id: '',  // Agregar usuario_id aquí
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
    this.pacienteData.usuario_id = correo;  // Asignar correo como usuario_id
    this.cargarDatosUsuario();
  }

  mostrarAlerta() {
    this.showAlert = true;
    setTimeout(() => {
      this.showAlert = false;
      this.router.navigate(['/home-paciente']);
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
        this.isNewProfile = error.status === 404;
      }
    );
  }

  guardarPerfil() {
    if (this.isNewProfile) {
      this.authService.crearPaciente(this.pacienteData).subscribe(
        () => {
          this.mostrarAlerta();
        },
        (error) => console.error('Error al crear el paciente:', error)
      );
    } else {
      this.authService.actualizarPaciente(this.pacienteData).subscribe(
        () => {
          this.mostrarAlerta();
        },
        (error) => console.error('Error al actualizar el paciente:', error)
      );
    }
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
