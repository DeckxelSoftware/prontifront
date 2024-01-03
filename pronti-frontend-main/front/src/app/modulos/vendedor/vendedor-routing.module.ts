import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RutaVendedorComponent} from './rutas/ruta-vendedor/ruta-vendedor.component';

const routes: Routes = [
  {
    component: RutaVendedorComponent,
    path: 'gestion-vendedores'
  },
  {
    path: '',
    redirectTo: 'gestion-vendedores',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendedorRoutingModule {
}
