import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-antes-despues',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './antes-despues.component.html',
  styleUrl: './antes-despues.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AntesDespuesComponent implements OnInit {
  simulacionId: string | null = null;
  simulacion: any = null;

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router){}

  ngOnInit(): void {
    this.simulacionId = this.route.snapshot.paramMap.get('id');
    this.obtenerSimulacionPorId(this.simulacionId);
  }

  obtenerSimulacionPorId(simulacionId: string | null): void {
    if (!simulacionId) {
      console.error('El ID de la simulación es nulo o no válido.');
      return;
    }

    const apiUrl = `https://simuladorbackend.onrender.com/simulaciones/${simulacionId}/estados`;

    this.http.get<any>(apiUrl).subscribe(
      (simulacion) => {
        console.log('Simulación obtenida:', simulacion); // Para depuración
        this.simulacion = simulacion; // Asignar la respuesta al atributo correspondiente
      },
      (error) => {
        console.error('Error al obtener la simulación:', error);
      }
    );
  }


  irAlInicio(): void {
    this.router.navigate(['/home-paciente']);
  }

  // Navegar al historial
  irAlHistorial(): void {
    this.router.navigate(['/historial']);
  }
}
