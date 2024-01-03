import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RutaListaValoresDetalleComponent} from './rutas/ruta-lista-valores-detalle/ruta-lista-valores-detalle.component';

const routes: Routes = [
  {
    component: RutaListaValoresDetalleComponent,
    path: 'modulo-lista-valores-detalle'
  },
  {
    path: '',
    redirectTo: 'modulo-lista-valores-detalle',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListaValoresDetalleRoutingModule {
}
