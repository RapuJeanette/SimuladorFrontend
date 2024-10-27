import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-editar-perfil',
  standalone: true,
  imports: [FormsModule,CommonModule],  // Asegúrate de que FormsModule esté incluido aquí
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.css']
})
export class EditarPerfilComponent implements OnInit {
  usuarioData = {
    nombre: '',
    telefono: '',
    direccion: '',
    fecha_nacimiento: '',
    carnet_identidad: '',
    sexo: ''
  };
  mensaje: string = '';
  esNuevoUsuario: boolean = false;

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const correo = this.route.snapshot.paramMap.get('correo');
  

    console.log(`Bienvenido, usuario con correo: ${correo}`);
  }

  cargarDatosUsuario(correo: string) {
    this.authService.obtenerPerfil(correo).subscribe(
      (perfil: any) => {
        if (perfil) {
          this.usuarioData = perfil;
          this.esNuevoUsuario = false;
        } else {
          this.esNuevoUsuario = true;
        }
      },
      (error) => {
        console.error("Error al cargar los datos del usuario:", error);
        if (error.status === 404) {
          this.esNuevoUsuario = true;
        }
      }
    );
  }

  guardarPerfil() {
    const correo = this.route.snapshot.paramMap.get('correo');
    

    if (this.esNuevoUsuario) {
      this.authService.crearPerfil(this.usuarioData).subscribe(
        () => {
          this.mensaje = 'Perfil creado exitosamente';
          this.esNuevoUsuario = false;
        },
        (error) => {
          console.error("Error al crear el perfil:", error);
          this.mensaje = 'Error al crear el perfil. Inténtelo de nuevo.';
        }
      );
    } else {
      this.authService.actualizarPerfil(this.usuarioData).subscribe(
        () => {
          this.mensaje = 'Perfil actualizado exitosamente';
        },
        (error) => {
          console.error("Error al actualizar el perfil:", error);
          this.mensaje = 'Error al actualizar el perfil. Inténtelo de nuevo.';
        }
      );
    }
  }
}
