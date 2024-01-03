import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RutaClienteComponent} from './rutas/ruta-cliente/ruta-cliente.component';

const routes: Routes = [
  {
    component: RutaClienteComponent,
    path: 'cliente'
  },
  {
    path: '',
    redirectTo: 'cliente',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteRoutingModule {
}
