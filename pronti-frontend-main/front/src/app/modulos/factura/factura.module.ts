import {NgModule} from '@angular/core';
import {FACTURA_IMPORTS} from './constantes/factura-imports';
import {FACTURA_PROVIDERS} from './constantes/factura-providers';
import {FACTURA_DECLARATIONS} from './constantes/factura-declarations';
import {BreadcrumbModule} from 'primeng/breadcrumb';

@NgModule({
  declarations: [
    ...FACTURA_DECLARATIONS,
  ],
    imports: [
        ...FACTURA_IMPORTS,
        BreadcrumbModule,
    ],
  providers: [
    ...FACTURA_PROVIDERS,
  ]
})
export class FacturaModule {
}
