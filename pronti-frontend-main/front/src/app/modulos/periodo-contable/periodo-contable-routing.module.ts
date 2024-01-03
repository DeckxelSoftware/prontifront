import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RutaPeriodoContableComponent} from './rutas/ruta-periodo-contable/ruta-periodo-contable.component';

const routes: Routes = [
  {
    component: RutaPeriodoContableComponent,
    path: 'periodo-contable-gestion'
  },
  {
    path: '',
    redirectTo: 'periodo-contable-gestion',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PeriodoContableRoutingModule {
}
