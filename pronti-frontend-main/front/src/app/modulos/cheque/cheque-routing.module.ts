import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RutaChequeComponent} from './rutas/ruta-cheque/ruta-cheque.component';

const routes: Routes = [
  {
    component: RutaChequeComponent,
    path: 'cheque-gestion'
  },
  {
    path: '',
    redirectTo: 'cheque-gestion',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChequeRoutingModule {
}
