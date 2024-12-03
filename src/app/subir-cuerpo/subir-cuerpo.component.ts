import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-subir-cuerpo',
  standalone: true,
  imports: [ FormsModule, CommonModule],
  templateUrl: './subir-cuerpo.component.html',
  styleUrl: './subir-cuerpo.component.css'
})
export class SubirCuerpoComponent {
  currentStep: number = 0; // Indica el paso actual (0 = izquierda, 1 = centro, 2 = derecha)
  fotos: File[] = [];
  rotationAngles: number[] = [];
  fotosParaEnviar: File[] = [];
  fotosPreview: string[] = [];

  constructor(private http: HttpClient, private router: Router) { }

  pasos = [
    { texto: 'Izquierdo', activo: true },
    { texto: 'Adelante', activo: false },
    { texto: 'Atras', activo: false },
    { texto: 'Derecho', activo: false }
  ];

  // Función para manejar la subida de fotos
  subirFoto(event: any): void {
    const files = event.target.files;
    if (files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        this.fotos.push(file);

        // Leer la imagen como URL para vista previa
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.fotosPreview.push(e.target.result); // Guardar la URL en fotosPreview
        };
        reader.readAsDataURL(file);  // Convertir el archivo a base64
      }
    }
  }


  borrarFoto(index: number): void {
    this.fotos.splice(index, 1);  // Elimina la foto en el índice especificado
    this.rotationAngles.splice(index, 1);
    this.fotosParaEnviar.splice(index, 1);
  }

  // Función para girar la foto
  girarFoto(index: number): void {
    this.rotationAngles[index] = (this.rotationAngles[index] + 90) % 360;  // Rota la foto en incrementos de 90 grados
  }

  continuar(): void {
    if (this.currentStep < this.pasos.length - 1) {
      this.pasos[this.currentStep].activo = false; // Desactiva el paso actual
      this.currentStep++; // Avanza al siguiente paso
      this.pasos[this.currentStep].activo = true; // Activa el siguiente paso
    }
  }

  enviarFotos() {
    if (this.fotos.length === 0) {
      console.log("No hay fotos para enviar");
      return;
    }

    const formData = new FormData();
    this.fotos.forEach((foto) => {
      formData.append('fotos', foto, foto.name);  // 'fotos' es el nombre del campo esperado por el backend
    });

    // Enviar las fotos al backend a través de HTTP POST
    this.http.post('https://simuladorbackend.onrender.com/subir-fotos/', formData).subscribe(
      (response: any) => {
        console.log('Fotos enviadas correctamente:', response);
        this.router.navigate(['/visualizador3d']);
      },
      (error) => {
        console.error('Error al enviar fotos:', error);
        // Aquí podrías mostrar un mensaje de error en la UI
      }
    );
  }
}
