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
import { PacientesComponent } from './pacientes/pacientes.component'
import { SeleccionParteCuerpoComponent } from './seleccion-parte-cuerpo/seleccion-parte-cuerpo.component'
import { CuerpoComponent } from './cuerpo/cuerpo.component'
import { PechoComponent } from './pecho/pecho.component'
import { CaraComponent } from './cara/cara.component'
import { SubirCuerpoComponent } from './subir-cuerpo/subir-cuerpo.component'
import { SubirFotoComponent } from './subir-foto/subir-foto.component'
import { GuiaImagenComponent } from './guia-imagen/guia-imagen.component'

export const routes: Routes = [
  { path: '', component: HomePageComponent },  // Ruta predeterminada para la página de inicio
  { path: 'registro', component: RegistroComponent },
  { path: 'admin-panel', component: AdminPanelComponent, canActivate: [AuthGuard] },
  { path: 'home-paciente', component: HomePacienteComponent, canActivate: [PatientGuard] },
  { path: 'doctor', component: DoctorComponent, canActivate: [AuthGuard] },
  { path: 'pago', component: PagoComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'pacientes', component: PacientesComponent },
  { path: 'seleccion-parte', component: SeleccionParteCuerpoComponent},
  { path: 'cuerpo', component: CuerpoComponent},
  { path: 'cara', component: CaraComponent},
  { path: 'pecho', component: PechoComponent},
  { path: 'subir-cuerpo', component: SubirCuerpoComponent},
  { path: 'subir-foto', component: SubirFotoComponent},
  { path: 'guia-imagen/:parte', component: GuiaImagenComponent},
  { path: 'editar-perfil/:correo', component: EditarPerfilComponent },
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
