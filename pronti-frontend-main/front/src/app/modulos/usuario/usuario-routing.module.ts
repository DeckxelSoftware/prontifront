import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RutaUsuarioComponent} from './rutas/ruta-usuario/ruta-usuario.component';

const routes: Routes = [
  {
    component: RutaUsuarioComponent,
    path: 'usuario'
  },
  {
    path: '',
    redirectTo: 'usuario',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule {
}
