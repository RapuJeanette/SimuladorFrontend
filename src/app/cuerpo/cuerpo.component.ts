import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cuerpo',
  standalone: true,
  imports: [ FormsModule ],
  templateUrl: './cuerpo.component.html',
  styleUrl: './cuerpo.component.css'
})
export class CuerpoComponent {
  medida: number | null = null;

  constructor(private router: Router) {}

  continuar(): void {
    if (this.medida) {
      console.log("Medida en cm:", this.medida);
      this.router.navigate(['/subir-cuerpo']); // Ajusta la ruta según tu enrutamiento.
    } else {
      alert("Por favor, ingrese una medida en centímetros.");
    }
  }

}
