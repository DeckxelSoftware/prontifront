import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RutaFiniquitoComponent} from './rutas/ruta-finiquito/ruta-finiquito.component';

const routes: Routes = [
  {
    component: RutaFiniquitoComponent,
    path: 'finiquito-gestion'
  },
  {
    path: '',
    redirectTo: 'finiquito-gestion',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FiniquitoRoutingModule {
}
