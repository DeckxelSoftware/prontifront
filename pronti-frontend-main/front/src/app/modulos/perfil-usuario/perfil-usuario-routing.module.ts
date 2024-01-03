import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RutaPerfilUsuarioComponent} from './rutas/ruta-perfil-usuario/ruta-perfil-usuario.component';

const routes: Routes = [
  {
    component: RutaPerfilUsuarioComponent,
    path: 'perfil-usuario'
  },
  {
    path: '',
    redirectTo: 'perfil-usuario',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PerfilUsuarioRoutingModule {
}
