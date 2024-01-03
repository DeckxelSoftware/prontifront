import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RutaHistoricoPlanContratoComponent} from './rutas/ruta-historico-plan-contrato/ruta-historico-plan-contrato.component';

const routes: Routes = [
  {
    component: RutaHistoricoPlanContratoComponent,
    path: 'historico-estado-contrato-gestion'
  },
  {
    path: ':idHistorico/refinanciamiento-modulo',
    loadChildren: () => import('../../modulos/refinanciamiento/refinanciamiento.module')
      .then(m => m.RefinanciamientoModule)
  },
  {
    path: '',

    redirectTo: 'historico-estado-contrato-gestion',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HistoricoPlanContratoRoutingModule {
}
