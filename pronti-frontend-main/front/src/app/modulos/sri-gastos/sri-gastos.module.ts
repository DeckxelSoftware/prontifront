import {NgModule} from '@angular/core';
import {SRI_GASTOS_IMPORTS} from './constantes/sri-gastos-imports';
import {SRI_GASTOS_PROVIDERS} from './constantes/sri-gastos-providers';
import {SRI_GASTOS_DECLARATIONS} from './constantes/sri-gastos-declarations';
import {BreadcrumbModule} from "primeng/breadcrumb";

@NgModule({
  declarations: [
    ...SRI_GASTOS_DECLARATIONS,
  ],
  imports: [
    ...SRI_GASTOS_IMPORTS,
    BreadcrumbModule,
  ],
  providers: [
    ...SRI_GASTOS_PROVIDERS,
  ]
})
export class SriGastosModule {
}
