import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { RouterModule } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modelo3-d',
  standalone: true,
  imports: [ RouterModule, CommonModule],
  templateUrl: './modelo3-d.component.html',
  styleUrl: './modelo3-d.component.css'
})
export class Modelo3DComponent implements OnInit, OnDestroy{
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer =  new THREE.WebGLRenderer() ;
  modelo3dUrl : string = '';  // Cambia la URL si es necesario
  controls: OrbitControls;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private http: HttpClient, private router: Router, private route: ActivatedRoute) {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000); // Aspecto inicial genérico
    this.renderer = new THREE.WebGLRenderer();
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.modelo3dUrl = params['url'] || ''; // Asigna el valor o deja vacío si no se pasa
      if (!this.modelo3dUrl) {
        console.error('No se recibió la URL del modelo 3D');
      }
    });
    if (isPlatformBrowser(this.platformId)) {
      this.initThreeJS();
    }
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
        model.position.set(0,0,0);
        model.scale.set(1,1,1);
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

  goBack(): void {
    this.router.navigate(['/historial']); // Redirige a la ruta deseada
  }

}
