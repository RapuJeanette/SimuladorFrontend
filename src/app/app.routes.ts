import { Routes } from '@angular/router';
import { DoctorComponent } from './doctor/doctor.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { RegistroComponent } from './registro/registro.component';

export const routes: Routes = [
  { path: 'registro', component: RegistroComponent },  // Ruta para el registro
  { path: 'doctor', component: DoctorComponent },
  { path: 'admin', component: AdminPanelComponent }, 
  { path: '', redirectTo: '/registro', pathMatch: 'full' },
];
