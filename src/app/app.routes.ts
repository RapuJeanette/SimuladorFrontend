import { Routes , RouterModule} from '@angular/router';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { DoctorComponent } from './doctor/doctor.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { RegistroComponent } from './registro/registro.component';
import { PagoComponent } from './pago/pago.component';
import { CitasComponent} from './citas/citas.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { AuthGuard } from './auth.guard';
export const routes: Routes = [
  { path: 'registro', component: RegistroComponent },  // Ruta para el registro
  { path: 'admin', component: AdminPanelComponent, canActivate: [AuthGuard] },  // Ruta protegida por el guard
  { path: 'doctor', component: DoctorComponent },
  { path: 'admin', component: AdminPanelComponent },
  { path: 'pago', component: PagoComponent },
  {path: 'login', component: LoginComponent},
  { path: 'citas', component: CitasComponent },
  {path:'admin-panel', component: AdminPanelComponent},
  { path: '', redirectTo: '/registro', pathMatch: 'full' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }]
})
export class AppRoutingModule { }
