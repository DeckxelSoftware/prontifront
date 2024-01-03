import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RutaLineaImpuestoComponent} from './rutas/ruta-linea-impuesto/ruta-linea-impuesto.component';

const routes: Routes = [
  {
    component: RutaLineaImpuestoComponent,
    path: 'linea-impuesto-gestion'
  },
  {
    path: '',
    redirectTo: 'linea-impuesto-gestion'
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LineaImpuestoRoutingModule {
}
