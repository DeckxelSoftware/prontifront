import {NgModule} from '@angular/core';
import {PAGOS_1_IMPORTS} from './constantes/pagos1-imports';
import {PAGOS_1_PROVIDERS} from './constantes/pagos1-providers';
import {PAGOS_1_DECLARATIONS} from './constantes/pagos1-declarations';

@NgModule({
  declarations: [
    ...PAGOS_1_DECLARATIONS,
  ],
  imports: [
    ...PAGOS_1_IMPORTS,
  ],
  providers: [
    ...PAGOS_1_PROVIDERS,
  ]
})
export class Pagos1Module {
}
