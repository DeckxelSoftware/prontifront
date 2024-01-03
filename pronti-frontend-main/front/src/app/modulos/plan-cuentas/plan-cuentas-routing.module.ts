import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RutaPlanCuentasComponent} from './rutas/ruta-plan-cuentas/ruta-plan-cuentas.component';

const routes: Routes = [
  {
    component: RutaPlanCuentasComponent,
    path: 'plan-cuentas'
  },
  {
    path: '',
    redirectTo: 'plan-cuentas',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlanCuentasRoutingModule {
}
