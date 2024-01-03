import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RutaRolPermisoComponent} from './rutas/ruta-rol-permiso/ruta-rol-permiso.component';

const routes: Routes = [
  {
    component: RutaRolPermisoComponent,
    path: 'rol-permiso'
  },
  {
    path: '',
    redirectTo: 'rol-permiso',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RolPermisoRoutingModule {
}
