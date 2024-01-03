import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RutaRolComponent} from './rutas/ruta-rol/ruta-rol.component';

const routes: Routes = [
  {
    component: RutaRolComponent,
    path: 'rol'
  },
  {
    path: '',
    redirectTo: 'rol',
  },
  {
    path: ':idRol/rol-permiso-modulo',
    loadChildren: () => import('../rol-permiso/rol-permiso.module').then(m => m.RolPermisoModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RolRoutingModule {
}
