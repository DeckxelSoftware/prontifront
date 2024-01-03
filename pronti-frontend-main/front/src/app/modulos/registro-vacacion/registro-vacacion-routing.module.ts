import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RutaRegistroVacacionComponent} from './rutas/ruta-registro-vacacion/ruta-registro-vacacion.component';

const routes: Routes = [
  {
    component: RutaRegistroVacacionComponent,
    path: 'registro-vacacion'
  },
  {
    path: '',
    redirectTo: 'registro-vacacion',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistroVacacionRoutingModule {
}
