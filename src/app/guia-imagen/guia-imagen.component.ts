import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-guia-imagen',
  standalone: true,
  imports: [ CommonModule , RouterModule],
  templateUrl: './guia-imagen.component.html',
  styleUrl: './guia-imagen.component.css'
})
export class GuiaImagenComponent implements OnInit {
  textoGuia: string[] = [];
  parte: 'pecho' | 'cara' | 'cuerpo' = 'pecho';
  imagenes: string[] = [];
  // Mapear cada parte con sus imágenes de ejemplo
  imagenesEjemplo : {
    [key in 'pecho' | 'cara' | 'cuerpo']: string[];
  } = {
    'pecho': ['assets/images/3d-example1.jpg', 'assets/images/3d-example2.jpg', 'assets/images/3d-example3.jpg'],
    'cara': ['assets/images/cara-ejemplo1.jpg', 'assets/images/cara-ejemplo2.jpg', 'assets/images/cara-ejemplo3.jpg'],
    'cuerpo': ['assets/images/cuerpo-ejemplo1.jpg', 'assets/images/cuerpo-ejemplo2.jpg', 'assets/images/cuerpo-ejemplo3.jpg']
  };

  textoGuiaEjemplo: {
    [key in 'pecho' | 'cara' | 'cuerpo']: string[];
  } = {
    'pecho': [
      'Para conseguir mejores resultados pon el móvil en una estantería y usa el temporizador de la cámara o pídele a alguien que te saque la foto.',
      'Si te sacas un selfie, asegúrate de que tu brazo no te tapa el cuerpo y que se ve la zona que va desde tu cintura hasta tu cuello.',
      'Toma las fotos en un entorno iluminado, preferiblemente con luz natural y evita las sombras.'
    ],

    'cara': [
      'Mantén una expresión neutra en todas las fotos. Pelo recogido, sin gafas y sin joyas.',
      'Toma las fotos en un entorno iluminado, preferiblemente con luz natural y evita las sombras.',
      'Incluye la cabeza completa y los hombros en cada foto.'
    ],

    'cuerpo': [
      'Permanece de pie y con los pies separados unos 20 cm aproximadamente, sitúa las manos sobre el pecho y levanta los codos en línea con los hombros.',
      'Haz las fotos con una buena iluminación natural o artificial que cubra tu cuerpo. Evita las sombras.',
      'Cada foto debe incluir la zona desde las espinillas hasta el cuello.',
      'Recomendamos que estés completamente desnudo, sin embargo, también funcionará si usas ropa interior ajustada.'
    ]
  };

  constructor(private route: ActivatedRoute,  private router: Router) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.parte = params['parte'] as 'pecho'| 'cara'|'cuerpo';
      this.cargarImagenes();
      this.cargarTextoGuia();
    });
  }

  cargarImagenes(): void {
    if (this.imagenesEjemplo[this.parte]) {
      this.imagenes = this.imagenesEjemplo[this.parte];
    } else {
      this.imagenes = []; // Si no hay imágenes para esa parte, dejamos vacío
    }
  }

  cargarTextoGuia(): void {
    this.textoGuia = this.textoGuiaEjemplo[this.parte];
  }

  redirigirAPagina(parte: string): void {
    this.router.navigate([parte]); // Redirige según la parte seleccionada
  }
}
