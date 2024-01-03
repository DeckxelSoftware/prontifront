import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RutaHistoricoRolComponent} from './rutas/ruta-historico-rol/ruta-historico-rol.component';
import { RutaInformeProvisionesComponent } from './rutas/ruta-informe-provisiones/ruta-informe-provisiones.component';

const routes: Routes = [
  {
    component: RutaHistoricoRolComponent,
    path: 'historico-rol'
  },

  {
    component: RutaInformeProvisionesComponent,
    path: 'informe-provisiones'
  },
  {
    path: '',
    redirectTo: 'historico-rol',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HistoricoRolRoutingModule {
}
