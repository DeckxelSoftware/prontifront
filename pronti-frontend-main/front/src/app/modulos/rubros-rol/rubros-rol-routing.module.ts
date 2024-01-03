import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RutaRubrosRolComponent} from './rutas/ruta-rubros-rol/ruta-rubros-rol.component';

const routes: Routes = [
  {
    component: RutaRubrosRolComponent,
    path: 'rubros-rol-gestion'
  },
  {
    path: '',
    redirectTo: 'rubros-rol-gestion',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RubrosRolRoutingModule {
}
