import {NgModule} from '@angular/core';
import {PLAN_CUENTAS_IMPORTS} from './constantes/plan-cuentas-imports';
import {PLAN_CUENTAS_PROVIDERS} from './constantes/plan-cuentas-providers';
import {PLAN_CUENTAS_DECLARATIONS} from './constantes/plan-cuentas-declarations';
import {ModalPlanCuentasModule} from './componentes/modal-plan-cuentas/modal-plan-cuentas.module';
import {BreadcrumbModule} from "primeng/breadcrumb";

@NgModule({
  declarations: [
    ...PLAN_CUENTAS_DECLARATIONS,
  ],
    imports: [
        ...PLAN_CUENTAS_IMPORTS,
        ModalPlanCuentasModule,
        BreadcrumbModule
    ],
  providers: [
    ...PLAN_CUENTAS_PROVIDERS,
  ]
})
export class PlanCuentasModule {
}
