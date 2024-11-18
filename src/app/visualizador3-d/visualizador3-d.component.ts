import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import * as THREE from 'three';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http'
import { CommonModule } from '@angular/common';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

@Component({
  selector: 'app-visualizador3-d',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './visualizador3-d.component.html',
  styleUrl: './visualizador3-d.component.css'
})
export class Visualizador3DComponent implements OnInit, OnDestroy {
  scene: THREE.Scene = new THREE.Scene();
  camera: THREE.PerspectiveCamera =  new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer();
  modelo3dUrl = 'https://res.cloudinary.com/dvc8eh9sn/raw/upload/v1731454514/modelos_3d/ewipjktw3llqv2yldevp.obj';  // Cambia la URL si es necesario
  controls: OrbitControls = new OrbitControls(this.camera, this.renderer.domElement);

  constructor(@Inject(PLATFORM_ID) private platformId: any, private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initThreeJS();
    }
  }

  // Inicializar la configuración de Three.js
  initThreeJS(): void {
    // Crear la escena
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xffffff);
    // Crear la cámara
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.z = 1;

    // Crear el renderizador
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth/2, window.innerHeight/2);  // Ajusta el tamaño del renderizador
    document.getElementById('viewer3d')?.appendChild(this.renderer.domElement);  // Agrega el canvas al contenedor

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
  }

  loadModel(): void {
    const loader = new OBJLoader();
    loader.load(
      this.modelo3dUrl,
      (obj) => {
        // Recorrer todos los objetos del modelo cargado
        obj.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.material = new THREE.MeshStandardMaterial({ color: 0x0077ff, roughness: 0.5 });
            child.castShadow = true;  // Hacer que el objeto proyecte sombra
            child.receiveShadow = true;  // Hacer que el objeto reciba sombra
          }
        });

        // Añadir el objeto a la escena
        this.scene?.add(obj);

        obj.position.set(0, 0.5, 0);  // Ajusta la posición
        obj.scale.set(1, 1, 1);  // Escala del modelo (ajusta según sea necesario)
        obj.rotation.x = Math.PI / 6;
        obj.rotation.y = Math.PI / 10;
        obj.rotation.z = Math.PI;
        this.animate();
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total * 100) + '% cargado');
      },
      (error) => {
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

}
