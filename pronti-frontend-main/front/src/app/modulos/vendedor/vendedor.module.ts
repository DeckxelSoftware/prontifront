import {NgModule} from '@angular/core';
import {VENDEDOR_IMPORTS} from './constantes/vendedor-imports';
import {VENDEDOR_PROVIDERS} from './constantes/vendedor-providers';
import {VENDEDOR_DECLARATIONS} from './constantes/vendedor-declarations';
import { BreadcrumbModule } from 'primeng/breadcrumb';

@NgModule({
  declarations: [
    ...VENDEDOR_DECLARATIONS,
  ],
  imports: [
    ...VENDEDOR_IMPORTS,
    BreadcrumbModule
  ],
  providers: [
    ...VENDEDOR_PROVIDERS,
  ]
})
export class VendedorModule {
}
