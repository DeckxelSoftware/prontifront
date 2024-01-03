import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BienesMenuComponent} from './bienes-menu.component';

const routes: Routes = [
  {
    path: '',
    component: BienesMenuComponent
  },
  {
    path: 'articulo-modulo',
    loadChildren: () => import('../articulo/articulo.module')
      .then(m => m.ArticuloModule)
  },
  {
    path: 'orden-de-compra-modulo',
    loadChildren: () => import('../orden-de-compra/orden-de-compra.module')
      .then(m => m.OrdenDeCompraModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BienesRoutingModule {
}
