import { Component, OnInit } from '@angular/core';
import { StripeService } from './stripe.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payment-component.component.html',
  styleUrl: './payment-component.component.css'
})
export class PaymentComponentComponent implements OnInit {
  clientSecret: string | null = null;
  public isProcessing = false;
  paymentSuccess: boolean = false;
  modelo3dUrl: string | null = null;
  simulacionId: string | null = null;

  constructor(private stripeService: StripeService, private http: HttpClient, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.stripeService.createPaymentIntent(1000).then(clientSecret => {
      this.clientSecret = clientSecret;
    });
    this.route.queryParams.subscribe(params => {
      this.simulacionId = params['simulacionId'];
      this.modelo3dUrl = params['url'] || null;

      if (this.modelo3dUrl) {
        console.log('URL del modelo 3D en la página de pago:', this.modelo3dUrl);
      } else {
        console.error('No se proporcionó la URL del modelo 3D');
      }
      if (this.simulacionId) {
        console.log('Simulacion ID:', this.simulacionId);
      } else {
        console.error('No se proporcionó el ID de la simulación');
      }
    });

  }

  ngAfterViewInit() {
    const cardElement = this.stripeService.getCardElement();
    if (cardElement) {
      cardElement.mount('#card-element');
    }
  }

  async handlePayment() {
    if (!this.clientSecret || !this.stripeService.stripe || !this.stripeService.card) {
      return;
    }
    this.isProcessing = true;

    const { paymentIntent, error } = await this.stripeService.stripe.confirmCardPayment(
      this.clientSecret,
      {
        payment_method: {
          card: this.stripeService.card,
        }
      }
    );

    if (error) {
      alert('Error: ' + error.message);
    } else if (paymentIntent?.status === 'succeeded') {
      this.paymentSuccess = true;

      const procedimientoSeleccionado = localStorage.getItem('procedimientoSeleccionado');
      if (procedimientoSeleccionado) {
        switch (procedimientoSeleccionado) {
          case 'Rinoplastia':
            this.processRinoplastia();  // Llama a la función para procesar Rinoplastia
            break;
          case 'Blefaroplastia':
            this.processBlefaroplastia();  // Llama a la función para procesar Blefaroplastia
            break;
          case 'Lifting_facial':
            this.processLiftingFacial();  // Llama a la función para procesar Lifting Facial
            break;
          case 'Bichetomia':
            this.processBichetomia();  // Llama a la función para procesar Bichetomía
            break;
          case 'Mentoplastia':
            this.processMentoplastia();  // Llama a la función para procesar Mentoplastia
            break;
          case 'Liposuccion_facial':
            this.processLiposuccionFacial();  // Llama a la función para procesar Liposucción Facial
            break;
          default:
            console.error('Procedimiento desconocido:', procedimientoSeleccionado);
            alert('Error: Procedimiento desconocido.');
            break;
        }
      } else {
        alert('No se ha seleccionado un procedimiento.');
      }
    }

    this.isProcessing = false;
  }

  goBack(): void {
    this.router.navigate(['/home-paciente']); // Redirige a la ruta deseada
  }

  async processRinoplastia() {
    const fileUrl = this.modelo3dUrl; // Obtener la URL del modelo "Antes" de los queryParams
    const body = { file_url: fileUrl };

    try {
      // Realizamos la solicitud POST al backend para procesar la rinoplastia
      this.http.post<{ modified_file_url: string }>('https://simuladorbackend.onrender.com/rinoplastia', body).subscribe(
        (response) => {
          console.log('Rinoplastia procesada correctamente:', response);

          // Verificamos si la respuesta contiene la URL del modelo 3D modificado
          const modifiedModelUrl = response.modified_file_url;

          if (modifiedModelUrl) {
            const simulacion_id = this.simulacionId
            if (!simulacion_id) {
              console.error('No se ha encontrado el ID del modelo 3D "Antes"');
              return;
            }
            // Crear estado de simulación con la URL del modelo modificado
            this.crearEstadoSimulacion(modifiedModelUrl, simulacion_id);
          } else {
            console.error('La respuesta no contiene la propiedad modified_file_url');
            alert('Error al procesar el modelo 3D.');
          }
        },
        (error) => {
          console.error('Error al procesar la Rinoplastia:', error);
          alert('Error al procesar el modelo 3D.');
        }
      );
    } catch (error) {
      console.error('Error al crear simulación:', error);
      alert('Error al crear el estado de simulación.');
    }
  }

  processBlefaroplastia() {
    const fileUrl = this.modelo3dUrl; // Obtener la URL del modelo "Antes" de los queryParams
    const body = { file_url: fileUrl };

    try {
      // Realizamos la solicitud POST al backend para procesar la rinoplastia
      this.http.post<{ modified_file_url: string }>('https://simuladorbackend.onrender.com/blefaroplastia', body).subscribe(
        (response) => {
          console.log('Blefaroplastia procesada correctamente:', response);

          // Verificamos si la respuesta contiene la URL del modelo 3D modificado
          const modifiedModelUrl = response.modified_file_url;

          if (modifiedModelUrl) {
            const simulacion_id = this.simulacionId
            if (!simulacion_id) {
              console.error('No se ha encontrado el ID del modelo 3D "Antes"');
              return;
            }
            // Crear estado de simulación con la URL del modelo modificado
            this.crearEstadoSimulacion(modifiedModelUrl, simulacion_id);
          } else {
            console.error('La respuesta no contiene la propiedad modified_file_url');
            alert('Error al procesar el modelo 3D.');
          }
        },
        (error) => {
          console.error('Error al procesar la Blefaroplastia:', error);
          alert('Error al procesar el modelo 3D.');
        }
      );
    } catch (error) {
      console.error('Error al crear simulación:', error);
      alert('Error al crear el estado de simulación.');
    }
    console.log('Procesando Blefaroplastia...');
  }

  processLiftingFacial() {
    const fileUrl = this.modelo3dUrl; // Obtener la URL del modelo "Antes" de los queryParams
    const body = { file_url: fileUrl };

    try {
      // Realizamos la solicitud POST al backend para procesar la rinoplastia
      this.http.post<{ modified_file_url: string }>('https://simuladorbackend.onrender.com/lifting_facial', body).subscribe(
        (response) => {
          console.log('Lifting Facial procesada correctamente:', response);

          // Verificamos si la respuesta contiene la URL del modelo 3D modificado
          const modifiedModelUrl = response.modified_file_url;

          if (modifiedModelUrl) {
            const simulacion_id = this.simulacionId
            if (!simulacion_id) {
              console.error('No se ha encontrado el ID del modelo 3D "Antes"');
              return;
            }
            // Crear estado de simulación con la URL del modelo modificado
            this.crearEstadoSimulacion(modifiedModelUrl, simulacion_id);
          } else {
            console.error('La respuesta no contiene la propiedad modified_file_url');
            alert('Error al procesar el modelo 3D.');
          }
        },
        (error) => {
          console.error('Error al procesar el Lifting Facial:', error);
          alert('Error al procesar el modelo 3D.');
        }
      );
    } catch (error) {
      console.error('Error al crear simulación:', error);
      alert('Error al crear el estado de simulación.');
    }
    console.log('Procesando Lifting Facial...');
  }

  processBichetomia() {
    const fileUrl = this.modelo3dUrl; // Obtener la URL del modelo "Antes" de los queryParams
    const body = { file_url: fileUrl };

    try {
      // Realizamos la solicitud POST al backend para procesar la rinoplastia
      this.http.post<{ modified_file_url: string }>('https://simuladorbackend.onrender.com/bichetomia', body).subscribe(
        (response) => {
          console.log('Bichetomia procesada correctamente:', response);

          // Verificamos si la respuesta contiene la URL del modelo 3D modificado
          const modifiedModelUrl = response.modified_file_url;

          if (modifiedModelUrl) {
            const simulacion_id = this.simulacionId
            if (!simulacion_id) {
              console.error('No se ha encontrado el ID del modelo 3D "Antes"');
              return;
            }
            // Crear estado de simulación con la URL del modelo modificado
            this.crearEstadoSimulacion(modifiedModelUrl, simulacion_id);
          } else {
            console.error('La respuesta no contiene la propiedad modified_file_url');
            alert('Error al procesar el modelo 3D.');
          }
        },
        (error) => {
          console.error('Error al procesar la Bichetomia:', error);
          alert('Error al procesar el modelo 3D.');
        }
      );
    } catch (error) {
      console.error('Error al crear simulación:', error);
      alert('Error al crear el estado de simulación.');
    }
    console.log('Procesando Bichetomía...');
  }

  processMentoplastia() {
    const fileUrl = this.modelo3dUrl; // Obtener la URL del modelo "Antes" de los queryParams
    const body = { file_url: fileUrl };

    try {
      // Realizamos la solicitud POST al backend para procesar la rinoplastia
      this.http.post<{ modified_file_url: string }>('https://simuladorbackend.onrender.com/mentoplastia', body).subscribe(
        (response) => {
          console.log('Mentoplastia procesada correctamente:', response);

          // Verificamos si la respuesta contiene la URL del modelo 3D modificado
          const modifiedModelUrl = response.modified_file_url;

          if (modifiedModelUrl) {
            const simulacion_id = this.simulacionId
            if (!simulacion_id) {
              console.error('No se ha encontrado el ID del modelo 3D "Antes"');
              return;
            }
            // Crear estado de simulación con la URL del modelo modificado
            this.crearEstadoSimulacion(modifiedModelUrl, simulacion_id);
          } else {
            console.error('La respuesta no contiene la propiedad modified_file_url');
            alert('Error al procesar el modelo 3D.');
          }
        },
        (error) => {
          console.error('Error al procesar la Mentoplastia:', error);
          alert('Error al procesar el modelo 3D.');
        }
      );
    } catch (error) {
      console.error('Error al crear simulación:', error);
      alert('Error al crear el estado de simulación.');
    }
    console.log('Procesando Mentoplastia...');
  }

  processLiposuccionFacial() {
    const fileUrl = this.modelo3dUrl; // Obtener la URL del modelo "Antes" de los queryParams
    const body = { file_url: fileUrl };

    try {
      // Realizamos la solicitud POST al backend para procesar la rinoplastia
      this.http.post<{ modified_file_url: string }>('https://simuladorbackend.onrender.com/liposuccion_facial', body).subscribe(
        (response) => {
          console.log('Liposuccion Facial procesada correctamente:', response);

          // Verificamos si la respuesta contiene la URL del modelo 3D modificado
          const modifiedModelUrl = response.modified_file_url;

          if (modifiedModelUrl) {
            const simulacion_id = this.simulacionId
            if (!simulacion_id) {
              console.error('No se ha encontrado el ID del modelo 3D "Antes"');
              return;
            }
            // Crear estado de simulación con la URL del modelo modificado
            this.crearEstadoSimulacion(modifiedModelUrl, simulacion_id);
          } else {
            console.error('La respuesta no contiene la propiedad modified_file_url');
            alert('Error al procesar el modelo 3D.');
          }
        },
        (error) => {
          console.error('Error al procesar la Liposuccion Facial:', error);
          alert('Error al procesar el modelo 3D.');
        }
      );
    } catch (error) {
      console.error('Error al crear simulación:', error);
      alert('Error al crear el estado de simulación.');
    }
    console.log('Procesando Liposucción Facial...');
  }
  // Función para crear el estado de simulación
  crearEstadoSimulacion(urlModelo3d: string, simulacionId: string) {
    const estadoSimulacion = {
      tipo_estado: 'Después',  // En este caso, es "Después" después de procesar la rinoplastia
      url_modelo_3d: urlModelo3d,
      fecha: new Date().toISOString(),
      simulacion_id: simulacionId // Implementa un método para obtener o generar este ID
    };

    this.http.post('https://simuladorbackend.onrender.com/estado_simulaciones/', estadoSimulacion).subscribe(
      (response: any) => {
        console.log('Estado de simulación creado con éxito:', response);

        this.router.navigate(['/antesdespues', simulacionId]);
      },
      (error) => {
        console.error('Error al crear estado de simulación:', error);
      }
    );
  }
}
