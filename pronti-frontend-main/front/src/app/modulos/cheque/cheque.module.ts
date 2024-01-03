import {NgModule} from '@angular/core';
import {CHEQUE_IMPORTS} from './constantes/cheque-imports';
import {CHEQUE_PROVIDERS} from './constantes/cheque-providers';
import {CHEQUE_DECLARATIONS} from './constantes/cheque-declarations';
import {BreadcrumbModule} from 'primeng/breadcrumb';

@NgModule({
  declarations: [
    ...CHEQUE_DECLARATIONS,
  ],
  imports: [
    ...CHEQUE_IMPORTS,
    BreadcrumbModule,
  ],
  providers: [
    ...CHEQUE_PROVIDERS,
  ]
})
export class ChequeModule {
}
