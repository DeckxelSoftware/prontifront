import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RutaChequeraComponent} from './rutas/ruta-chequera/ruta-chequera.component';

const routes: Routes = [
  {
    component: RutaChequeraComponent,
    path: 'chequera-gestion'
  },
  {
    path: '',
    redirectTo: 'chequera-gestion',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChequeraRoutingModule {
}
