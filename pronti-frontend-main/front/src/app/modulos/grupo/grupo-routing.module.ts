import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RutaGrupoComponent} from './rutas/ruta-grupo/ruta-grupo.component';

const routes: Routes = [
  {
    component: RutaGrupoComponent,
    path: 'grupo'
  },
  {
    path: '',
    redirectTo: 'grupo',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GrupoRoutingModule {
}
