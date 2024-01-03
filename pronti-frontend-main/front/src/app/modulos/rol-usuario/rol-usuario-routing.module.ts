import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RutaRolUsuarioComponent} from './rutas/ruta-rol-usuario/ruta-rol-usuario.component';

const routes: Routes = [
  {
    component: RutaRolUsuarioComponent,
    path: 'rol-usuario'
  },
  {
    path: '',
    redirectTo: 'rol-usuario',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RolUsuarioRoutingModule {
}
