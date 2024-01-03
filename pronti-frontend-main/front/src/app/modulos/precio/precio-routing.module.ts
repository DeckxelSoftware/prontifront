import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RutaPrecioComponent} from './rutas/ruta-precio/ruta-precio.component';

const routes: Routes = [
  {
    component: RutaPrecioComponent,
    path: 'gestion-precio'
  },
  {
    path: '',
    redirectTo: 'gestion-precio',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrecioRoutingModule {
}
