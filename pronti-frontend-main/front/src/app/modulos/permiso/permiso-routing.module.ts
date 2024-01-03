import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RutaPermisoComponent} from './rutas/ruta-permiso/ruta-permiso.component';

const routes: Routes = [
  {
    component: RutaPermisoComponent,
    path: 'permiso'
  },
  {
    path: '',
    redirectTo: 'permiso',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PermisoRoutingModule {
}
