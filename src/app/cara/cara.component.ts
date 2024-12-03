import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cara',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './cara.component.html',
  styleUrl: './cara.component.css'
})
export class CaraComponent {
  currentStep: number = 0; // Indica el paso actual (0 = izquierda, 1 = centro, 2 = derecha)
  fotos: File[] = [];
  fotosPreview: string[] = [];
  rotationAngles: number[] = [];
  fotosParaEnviar: File[] = [];

  constructor(private http: HttpClient, private router: Router) { }

  pasos = [
    { texto: 'Izquierda', activo: true },
    { texto: 'Centro', activo: false },
    { texto: 'Derecha', activo: false }
  ];

  // Función para manejar la subida de fotos
  subirFoto(event: any): void {
    const files = event.target.files;
    if (files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        this.fotos.push(file);
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
    this.rotationAngles[index] = (this.rotationAngles[index] + 90) % 360;
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
      formData.append('files', foto, foto.name);  // 'fotos' es el nombre del campo esperado por el backend
    });

    this.http.post<{ model_url: string }>('https://simuladorbackend.onrender.com/upload-photos/', formData).subscribe(
      (response: any) => {
        console.log('Fotos enviadas correctamente:', response);
        const modelo3dUrl = response.model_url

        this.crearEstadoSimulacion(response.model_url);
        console.log("url"+ response.model_url);

      },
      (error) => {
        console.error('Error al enviar fotos:', error);
        // Aquí podrías mostrar un mensaje de error en la UI
      }
    );
  }

  crearEstadoSimulacion(urlModelo3d: string) {
    const estadoSimulacion = {
      tipo_estado: 'Antes',  // Este valor puede ser dinámico
      url_modelo_3d: urlModelo3d,
      fecha: new Date().toISOString(),
      simulacion_id: this.generarSimulacionId() // Implementa un método para obtener o generar este ID
    };

    this.http.post('https://simuladorbackend.onrender.com/estado_simulaciones/', estadoSimulacion).subscribe(
      (response: any) => {
        console.log('Estado de simulación creado con éxito:', response);

        // Navegar a otra vista o notificar al usuario del éxito
        this.router.navigate(['/visualizador3d'], { queryParams: { url: urlModelo3d } });
      },
      (error) => {
        console.error('Error al crear estado de simulación:', error);
      }
    );
  }

  generarSimulacionId(): string {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let id = 'simulacion_';
    for (let i = 0; i < 10; i++) {
        id += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    return id;
}


}
