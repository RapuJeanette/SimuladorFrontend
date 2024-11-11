import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pecho',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './pecho.component.html',
  styleUrl: './pecho.component.css'
})
export class PechoComponent {
  medida: number | null = null;

  constructor(private router: Router) {}

  continuar(): void {
    if (this.medida) {
      // Aquí puedes redirigir o realizar alguna acción con la medida ingresada.
      console.log("Medida en cm:", this.medida);
      this.router.navigate(['/subir-foto']); // Ajusta la ruta según tu enrutamiento.
    } else {
      alert("Por favor, ingrese una medida en centímetros.");
    }
  }
}
