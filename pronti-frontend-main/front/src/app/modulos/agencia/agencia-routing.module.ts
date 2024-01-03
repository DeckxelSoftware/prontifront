import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RutaAgenciaComponent} from './rutas/ruta-agencia/ruta-agencia.component';

const routes: Routes = [
  {
    component: RutaAgenciaComponent,
    path: 'gestion-agencias'
  },

  {
    path: '',
    redirectTo: 'gestion-agencias',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgenciaRoutingModule {
}
