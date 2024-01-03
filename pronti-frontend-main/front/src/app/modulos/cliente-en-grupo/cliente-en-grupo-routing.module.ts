import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RutaClienteEnGrupoComponent} from './rutas/ruta-cliente-en-grupo/ruta-cliente-en-grupo.component';

const routes: Routes = [
  {
    component: RutaClienteEnGrupoComponent,
    path: 'cliente-en-grupo'
  },
  {
    path: '',
    redirectTo: 'cliente-en-grupo',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteEnGrupoRoutingModule {
}
