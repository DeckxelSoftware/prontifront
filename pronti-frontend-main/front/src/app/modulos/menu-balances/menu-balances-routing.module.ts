import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MenuBalancesComponent} from "./menu-balances.component";

const routes: Routes = [
  {
    path: 'cuenta-contable-modulo',
    loadChildren: () => import('../cuenta-contable/cuenta-contable.module')
      .then((m) => m.CuentaContableModule)
  },
  {
    path: '',
    component: MenuBalancesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuBalancesRoutingModule {
}
