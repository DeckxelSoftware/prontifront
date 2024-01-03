import {NgModule} from '@angular/core';
import {CHEQUERA_IMPORTS} from './constantes/chequera-imports';
import {CHEQUERA_PROVIDERS} from './constantes/chequera-providers';
import {CHEQUERA_DECLARATIONS} from './constantes/chequera-declarations';
import {BreadcrumbModule} from 'primeng/breadcrumb';

@NgModule({
  declarations: [
    ...CHEQUERA_DECLARATIONS,
  ],
  imports: [
    ...CHEQUERA_IMPORTS,
    BreadcrumbModule,
  ],
  providers: [
    ...CHEQUERA_PROVIDERS,
  ]
})
export class ChequeraModule {
}
