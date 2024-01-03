import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RutaOrdenDeCompraComponent} from './rutas/ruta-orden-de-compra/ruta-orden-de-compra.component';

const routes: Routes = [
  {
    component: RutaOrdenDeCompraComponent,
    path: 'orden-de-compra'
  },
  {
    path: '',
    redirectTo: 'orden-de-compra',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdenDeCompraRoutingModule {
}
