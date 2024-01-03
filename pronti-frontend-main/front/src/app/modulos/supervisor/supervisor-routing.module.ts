import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RutaSupervisorComponent} from './rutas/ruta-supervisor/ruta-supervisor.component';

const routes: Routes = [
  {
    component: RutaSupervisorComponent,
    path: 'gestion-supervisores'
  },
  {
    path: '',
    redirectTo: 'gestion-supervisores',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupervisorRoutingModule {
}
