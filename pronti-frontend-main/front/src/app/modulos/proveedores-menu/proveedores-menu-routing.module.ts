import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProveedoresMenuComponent} from './proveedores-menu.component';

const routes: Routes = [
  {
    path: '',
    component: ProveedoresMenuComponent
  },
  {
    path: 'proveedor-modulo',
    loadChildren: () => import('../proveedor/proveedor.module')
      .then(m => m.ProveedorModule)
  },
  {
    path: 'compras-modulo',
    loadChildren: () => import('../menu-compras/menu-compras.module')
      .then(m => m.MenuComprasModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProveedoresMenuRoutingModule {
}
