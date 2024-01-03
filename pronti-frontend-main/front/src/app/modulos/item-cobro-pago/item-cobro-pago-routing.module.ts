import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RutaItemCobroPagoComponent} from './rutas/ruta-item-cobro-pago/ruta-item-cobro-pago.component';

const routes: Routes = [
  {
    component: RutaItemCobroPagoComponent,
    path: 'item-cobro-pago'
  },
  {
    path: '',
    redirectTo: 'item-cobro-pago',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemCobroPagoRoutingModule {
}
