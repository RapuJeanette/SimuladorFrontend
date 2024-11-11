import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seleccion-parte-cuerpo',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './seleccion-parte-cuerpo.component.html',
  styleUrl: './seleccion-parte-cuerpo.component.css'
})
export class SeleccionParteCuerpoComponent {
  constructor(private router: Router) {}

  seleccionarParte(parte: string): void{
    this.router.navigate([`/guia-imagen/${parte}`]);
  }

}
