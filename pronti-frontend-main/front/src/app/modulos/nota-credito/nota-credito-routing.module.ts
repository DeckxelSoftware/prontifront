import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RutaNotaCreditoComponent} from './rutas/ruta-nota-credito/ruta-nota-credito.component';

const routes: Routes = [
  {
    component: RutaNotaCreditoComponent,
    path: 'nota-credito'
  },
  {
    path: '',
    redirectTo: 'nota-credito',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotaCreditoRoutingModule {
}
