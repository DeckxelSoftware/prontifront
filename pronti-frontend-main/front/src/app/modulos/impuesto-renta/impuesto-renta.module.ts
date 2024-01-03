import {NgModule} from '@angular/core';
import {IMPUESTO_RENTA_IMPORTS} from './constantes/impuesto-renta-imports';
import {IMPUESTO_RENTA_PROVIDERS} from './constantes/impuesto-renta-providers';
import {IMPUESTO_RENTA_DECLARATIONS} from './constantes/impuesto-renta-declarations';
import {BreadcrumbModule} from 'primeng/breadcrumb';

@NgModule({
  declarations: [
    ...IMPUESTO_RENTA_DECLARATIONS,
  ],
  imports: [
    ...IMPUESTO_RENTA_IMPORTS,
    BreadcrumbModule,
  ],
  providers: [
    ...IMPUESTO_RENTA_PROVIDERS,
  ]
})
export class ImpuestoRentaModule {
}
