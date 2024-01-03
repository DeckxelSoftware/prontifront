import {NgModule} from '@angular/core';
import {PLAN_IMPORTS} from './constantes/plan-imports';
import {PLAN_PROVIDERS} from './constantes/plan-providers';
import {PLAN_DECLARATIONS} from './constantes/plan-declarations';
import {BreadcrumbModule} from "primeng/breadcrumb";

@NgModule({
  declarations: [
    ...PLAN_DECLARATIONS,
  ],
    imports: [
        ...PLAN_IMPORTS,
        BreadcrumbModule,
    ],
  providers: [
    ...PLAN_PROVIDERS,
  ]
})
export class PlanModule {
}
