import { Routes } from '@angular/router';
import { RegistroComponent } from './registro/registro.component';

export const routes: Routes = [
  { path: 'registro', component: RegistroComponent },  // Ruta para el registro
  { path: '', redirectTo: '/registro', pathMatch: 'full' }, 
];
