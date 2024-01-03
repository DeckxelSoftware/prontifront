import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MenuComprasComponent} from "./menu-compras.component";

const routes: Routes = [
  {
    path: '',
    component: MenuComprasComponent
  },
  {
    path: 'cabecera-compra-modulo',
    loadChildren: () => import('../cabecera-compra/cabecera-compra.module')
      .then(m => m.CabeceraCompraModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuComprasRoutingModule {
}
