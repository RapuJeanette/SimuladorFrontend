import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import * as THREE from 'three';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'
import { CommonModule } from '@angular/common';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

@Component({
  selector: 'app-visualizador3-d',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './visualizador3-d.component.html',
  styleUrl: './visualizador3-d.component.css'
})
export class Visualizador3DComponent implements OnInit, OnDestroy {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer();
  modelo3dUrl: string | null = null;
  controls: OrbitControls;
  simulacionId: string | null = null;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private http: HttpClient, private router: Router, private route: ActivatedRoute) {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000); // Aspecto inicial genérico
    this.renderer = new THREE.WebGLRenderer();
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.simulacionId = params['simulacionId'];
      this.modelo3dUrl = params['url'] || null;

      if (this.modelo3dUrl) {
        console.log('URL del modelo 3D:', this.modelo3dUrl);
      } else {
        console.error('No se proporcionó la URL del modelo 3D');
      }
    });
    if (isPlatformBrowser(this.platformId)) {
      this.initThreeJS();
    }
  }

  actualizarSimulacion() {
    if (!this.simulacionId) {
      console.error("No se encontró el ID de la simulación.");
      alert("Error: No se puede actualizar la simulación porque falta el ID.");
      return;
    }

    const procedimientoSelect = (document.getElementById("procedimiento") as HTMLSelectElement);
    const procedimientoSeleccionado = procedimientoSelect.value;

    const userCorreo = localStorage.getItem('user_correo');
    if (!userCorreo) {
      console.error("No se encontró el correo del usuario en el almacenamiento local.");
      alert("Error: No se puede obtener el paciente porque falta el correo del usuario.");
      return;
    }

    // Consultar el paciente correspondiente al correo
    this.http.get<any[]>('https://simuladorbackend.onrender.com/pacientes').subscribe(
      (pacientes) => {
        // Buscar el paciente con el correo que coincide
        const paciente = pacientes.find((p) => p.usuario_id === userCorreo);

        if (!paciente) {
          console.error("No se encontró un paciente con el correo proporcionado.");
          alert("Error: No se encontró un paciente asociado al correo del usuario.");
          return;
        }

        const pacienteId = paciente.id;
        // Crea los datos para actualizar
        const datosActualizados = {
          descripcion: procedimientoSeleccionado,
          fecha_creacion: new Date().toISOString(),
          paciente_id: pacienteId,
        };

        // Realiza la solicitud PUT al backend
        this.http.put(`https://simuladorbackend.onrender.com/simulaciones/${this.simulacionId}`, datosActualizados).subscribe(
          (response) => {
            console.log('Simulación actualizada con éxito:', response);
            alert('Simulación actualizada con éxito');
          },
          (error) => {
            console.error('Error al actualizar simulación:', error);
            alert('Error al actualizar la simulación. Por favor, inténtalo de nuevo.');
          }
        );
      }, (error) => {
        console.error("Error al consultar la lista de pacientes:", error);
        alert("Error al consultar la lista de pacientes. Por favor, inténtalo de nuevo.");
      }
    );
  }

  obtenerPacienteId(correo: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this.http.get<any[]>('https://simuladorbackend.onrender.com/pacientes').subscribe(
        (pacientes) => {
          const paciente = pacientes.find(p => p.usuario_id === correo);
          if (paciente) {
            resolve(paciente.id);
          } else {
            console.error('Paciente no encontrado');
            reject('Paciente no encontrado');
          }
        },
        (error) => {
          console.error('Error al obtener lista de pacientes:', error);
          reject(error);
        }
      );
    });
  }



  initThreeJS(): void {
    const viewerElement = document.getElementById('viewer3d');
    const viewerRect = viewerElement?.getBoundingClientRect();
    const width = viewerRect?.width || 800;  // Si no encuentra el contenedor, usa un tamaño predeterminado
    const height = viewerRect?.height || 600;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.camera.position.z = 1;

    this.renderer.setSize(width, height);
    this.renderer.setClearColor(0xffffff);
    viewerElement?.appendChild(this.renderer.domElement);

    // Agregar controles de la cámara para mover el objeto
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.25;
    this.controls.screenSpacePanning = false;
    this.controls.maxPolarAngle = Math.PI / 2;

    const light = new THREE.AmbientLight(0x404040, 1); // Luz ambiental
    this.scene.add(light);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // Luz direccional
    directionalLight.position.set(5, 5, 5)  // Posición de la luz
    directionalLight.target = this.scene;
    this.scene.add(directionalLight);

    this.loadModel();

    window.addEventListener('resize', () => {
      const viewerElement = document.getElementById('viewer3d');
      const viewerRect = viewerElement?.getBoundingClientRect();
      const width = viewerRect?.width || 0;
      const height = viewerRect?.height || 0;

      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(width, height);
    });
  }

  loadModel(): void {
    const loader = new GLTFLoader();
    loader.load(
      this.modelo3dUrl,
      (gltf: { scene: any; }) => {
        const model = gltf.scene;
        model.position.set(0, 0, 0);
        model.scale.set(1, 1, 1);
        this.scene?.add(model);
        this.animate();
      },
      (xhr: { loaded: number; total: number; }) => {
        console.log((xhr.loaded / xhr.total * 100) + '% cargado');
      },
      (error: any) => {
        console.error('Error al cargar el modelo 3D:', error);
      }
    );
  }

  animate(): void {
    requestAnimationFrame(() => this.animate());
    this.controls.update();  // Actualiza los controles
    this.renderer.render(this.scene!, this.camera!);  // Renderiza la escena con la cámara
  }

  ngOnDestroy(): void {
    if (this.controls) {
      this.controls.dispose();
    }
    if (this.renderer) {
      this.renderer.dispose();
    }
  }

  procesarProcedimiento(): void {
    const procedimientoSelect = (document.getElementById('procedimiento') as HTMLSelectElement);
    const procedimientoSeleccionado = procedimientoSelect.value;

    if (!procedimientoSeleccionado) {
      alert('Por favor, selecciona un procedimiento.');
      return;
    }

    localStorage.setItem('procedimientoSeleccionado', procedimientoSeleccionado);

    const urlModelo3d = this.modelo3dUrl;
    const simulacionId = this.simulacionId

    if (!urlModelo3d) {
      console.error('No se ha encontrado la URL del modelo 3D "Antes"');
      return;
    }
    if (!simulacionId) {
      console.error('No se ha encontrado el ID del modelo 3D "Antes"');
      return;
    }

    console.log(procedimientoSeleccionado);
    this.goToPayment(urlModelo3d, simulacionId);
  }


  zoomIn(): void {
    this.camera.position.z -= 0.5; // Acerca la cámara
  }

  // Función de Zoom Out
  zoomOut(): void {
    this.camera.position.z += 0.5; // Aleja la cámara
  }

  // Función para ajustar el zoom con el control de rango
  adjustZoom(event: any): void {
    const zoomValue = event.target.value;
    this.camera.position.z = 5 - zoomValue; // Ajusta el zoom según el valor
  }

  goToPayment(urlModelo3d: string, simulacion_id: string): void {
    this.router.navigate(['/payment'], { queryParams: { url: urlModelo3d, simulacionId: simulacion_id } }); // Redirige a la ruta deseada
  }

  goBack(): void {
    this.router.navigate(['/home-paciente']); // Redirige a la ruta deseada
  }
}
