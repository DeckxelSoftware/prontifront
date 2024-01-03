import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ContabilidadMenuComponent} from './contabilidad-menu.component';

const routes: Routes = [
  {
    path: '',
    component: ContabilidadMenuComponent
  },
  {
    path: 'grupo-contable-modulo',
    loadChildren: () => import('../grupo-contable/grupo-contable.module')
      .then(m => m.GrupoContableModule)
  },
  {
    path: 'chequera-modulo',
    loadChildren: () => import('../chequera/chequera.module')
      .then(m => m.ChequeraModule)
  },
  {
    path: 'cheque-modulo',
    loadChildren: () => import('../cheque/cheque.module')
      .then(m => m.ChequeModule)
  },
  {
    path: 'periodo-contable-modulo',
    loadChildren: () => import('../periodo-contable/periodo-contable.module')
      .then(m => m.PeriodoContableModule)
  },
  {
    path: 'cuenta-contable-modulo',
    loadChildren: () => import('../cuenta-contable/cuenta-contable.module')
      .then(m => m.CuentaContableModule)
  },
  {
    path: 'asiento-contable-cabecera-modulo',
    loadChildren: () => import('../asiento-contable-cabecera/asiento-contable-cabecera.module')
      .then(m => m.AsientoContableCabeceraModule)
  },
  {
    path: 'plan-cuentas-modulo',
    loadChildren: () => import('../plan-cuentas/plan-cuentas.module')
      .then(m => m.PlanCuentasModule)
  },
  {
    path: 'item-cobro-pago-modulo',
    loadChildren: () => import('../item-cobro-pago/item-cobro-pago.module')
      .then(m => m.ItemCobroPagoModule)
  },
  {
    path: 'reportes-contabilidad-menu',
    loadChildren: () => import('../reportes-contabilidad-menu/reportes-contabilidad-menu.module')
      .then(m => m.ReportesContabilidadMenuModule)
  },
  {
    path: 'balances-menu',
    loadChildren: () => import('../menu-balances/menu-balances.module')
      .then(m => m.MenuBalancesModule)
  },
  {
    path: 'cobro-modulo',
    loadChildren: () => import('../cobro/cobro.module')
      .then(m => m.CobroModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContabilidadMenuRoutingModule {
}
