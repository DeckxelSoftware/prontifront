import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RutaProveedorComponent} from './rutas/ruta-proveedor/ruta-proveedor.component';

const routes: Routes = [
  {
    component: RutaProveedorComponent,
    path: 'gestion-proveedor'
  },
  {
    path: '',
    redirectTo: 'gestion-proveedor',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProveedorRoutingModule {
}
