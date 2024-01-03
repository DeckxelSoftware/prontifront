import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RutaRecursoComponent} from './rutas/ruta-recurso/ruta-recurso.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'recurso-gestion',
  },
  {
    component: RutaRecursoComponent,
    path: 'recurso-gestion'
  },
  {
    path: ':idRecurso/linea-impuesto-modulo',
    loadChildren: () => import('../linea-impuesto/linea-impuesto.module')
      .then(m => m.LineaImpuestoModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecursoRoutingModule {
}
