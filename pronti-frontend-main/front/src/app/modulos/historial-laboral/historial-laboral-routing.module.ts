import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RutaHistorialLaboralComponent} from './rutas/ruta-historial-laboral/ruta-historial-laboral.component';

const routes: Routes = [
  {
    component: RutaHistorialLaboralComponent,
    path: 'historial-laboral-gestion'
  },
  {
    path: '',
    redirectTo: 'historial-laboral-gestion',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HistorialLaboralRoutingModule {
}
