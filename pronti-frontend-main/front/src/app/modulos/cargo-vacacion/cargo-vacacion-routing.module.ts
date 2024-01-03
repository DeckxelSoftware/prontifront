import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RutaCargoVacacionComponent} from './rutas/ruta-cargo-vacacion/ruta-cargo-vacacion.component';
import { RutaInformeVacacionesComponent } from './rutas/ruta-informe-vacaciones/ruta-informe-vacaciones.component';

const routes: Routes = [
  {
    component: RutaCargoVacacionComponent,
    path: 'cargo-vacacion-gestion'
  },
  {
    path: ':idCargoVacacion/registro-vacacion-modulo',
    loadChildren: () => import('../registro-vacacion/registro-vacacion.module')
      .then(m => m.RegistroVacacionModule)
  },
  {
    component: RutaInformeVacacionesComponent,
    path: 'informe-vacaciones'
  },
  {
    path: '',
    redirectTo: 'cargo-vacacion-gestion',
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CargoVacacionRoutingModule {
}
