import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-subir-cuerpo',
  standalone: true,
  imports: [ FormsModule, CommonModule],
  templateUrl: './subir-cuerpo.component.html',
  styleUrl: './subir-cuerpo.component.css'
})
export class SubirCuerpoComponent {
  currentStep: number = 0; // Indica el paso actual (0 = izquierda, 1 = centro, 2 = derecha)
  foto: string | ArrayBuffer | null = null; // Almacena la foto cargada
  rotationAngle: number = 0;
  // Los pasos con su correspondiente texto
  pasos = [
    { texto: 'Izquierdo', activo: true },
    { texto: 'Adelante', activo: false },
    { texto: 'Atras', activo: false },
    { texto: 'Derecho', activo: false }
  ];

  // Función para manejar la subida de fotos
  subirFoto(event: any): void {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.foto = reader.result; // Asigna la imagen a la vista previa
      this.rotationAngle = 0;
    };
    if (file) {
      reader.readAsDataURL(file); // Lee el archivo como una URL de datos
    }
  }

  borrarFoto(): void {
    this.foto = null; // Elimina la foto de la vista previa
    this.rotationAngle = 0; // Resetea el ángulo de rotación
  }

  // Función para girar la foto
  girarFoto(): void {
    this.rotationAngle = (this.rotationAngle + 90) % 360; // Rota la imagen en incrementos de 90 grados
  }

  continuar(): void {
    if (this.currentStep < this.pasos.length - 1) {
      this.pasos[this.currentStep].activo = false; // Desactiva el paso actual
      this.currentStep++; // Avanza al siguiente paso
      this.pasos[this.currentStep].activo = true; // Activa el siguiente paso
      this.foto = null; // Limpia la foto para el siguiente paso
    }
  }
}
