import { Routes , RouterModule} from '@angular/router';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { DoctorComponent } from './doctor/doctor.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { RegistroComponent } from './registro/registro.component';
import { PagoComponent } from './pago/pago.component';
import { CitasComponent } from './citas/citas.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { AuthGuard } from './auth.guard';
import { HomePageComponent } from './home-page/home-page.component';
import { PatientGuard } from './patient.guard';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { HomePacienteComponent } from './home-paciente/home-paciente.component';
import { EditarPerfilComponent } from './editar-perfil/editar-perfil.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent },  // Ruta predeterminada para la página de inicio
  { path: 'registro', component: RegistroComponent },
  { path: 'admin-panel', component: AdminPanelComponent, canActivate: [AuthGuard] },
  { path: 'home-paciente', component: HomePacienteComponent, canActivate: [PatientGuard] },
  { path: 'doctor', component: DoctorComponent, canActivate: [AuthGuard] },
  { path: 'pago', component: PagoComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'editar-perfil/:correo', component: EditarPerfilComponent, canActivate: [AuthGuard,PatientGuard] },
  { path: 'citas', component: CitasComponent, canActivate: [AuthGuard] },
  { path: 'home-paciente/editar-perfil', component: EditarPerfilComponent, canActivate: [PatientGuard] },
  { path: '**', redirectTo: '' }  // Redirige cualquier ruta no reconocida a la página de inicio
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [ provideHttpClient(withFetch()) ,{ provide: LocationStrategy, useClass: HashLocationStrategy }]
})
export class AppRoutingModule { }
