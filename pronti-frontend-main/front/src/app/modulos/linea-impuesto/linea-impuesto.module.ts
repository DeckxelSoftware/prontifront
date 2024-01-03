import {NgModule} from '@angular/core';
import {LINEA_IMPUESTO_IMPORTS} from './constantes/linea-impuesto-imports';
import {LINEA_IMPUESTO_PROVIDERS} from './constantes/linea-impuesto-providers';
import {LINEA_IMPUESTO_DECLARATIONS} from './constantes/linea-impuesto-declarations';
import {BreadcrumbModule} from "primeng/breadcrumb";

@NgModule({
  declarations: [
    ...LINEA_IMPUESTO_DECLARATIONS,
  ],
  imports: [
    ...LINEA_IMPUESTO_IMPORTS,
    BreadcrumbModule,
  ],
  providers: [
    ...LINEA_IMPUESTO_PROVIDERS,
  ]
})
export class LineaImpuestoModule {
}
