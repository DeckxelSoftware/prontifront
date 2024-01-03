import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ContratosMenuComponent} from './contratos-menu/contratos-menu.component';

const routes: Routes = [
  {
    path: '',
    component: ContratosMenuComponent
  },
  {
    path: 'cliente-modulo',
    loadChildren: () => import('../cliente/cliente.module')
      .then(m => m.ClienteModule)
  },

  {
    path: 'grupo-modulo',
    loadChildren: () => import('../grupo/grupo.module')
      .then(m => m.GrupoModule)
  },

  {
    path: 'plan-modulo',
    loadChildren: () => import('../plan/plan.module')
      .then(m => m.PlanModule)
  },
  {
    path: 'contrato-modulo',
    loadChildren: () => import('../contrato/contrato.module')
      .then(m => m.ContratoModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContratosMenuRoutingModule {
}
