import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-features',
  standalone: true,  // Agrega esto para que sea standalone
  imports: [CommonModule],
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.css']
})
export class FeaturesComponent {
  // Estado para controlar qué video mostrar
  showAntesVideo = true;

  // Método para alternar videos
  toggleVideo(tipo: 'antes' | 'despues'): void {
    this.showAntesVideo = tipo === 'antes';
  }
}
