import {NgModule} from '@angular/core';
import {NOTA_CREDITO_IMPORTS} from './constantes/nota-credito-imports';
import {NOTA_CREDITO_PROVIDERS} from './constantes/nota-credito-providers';
import {NOTA_CREDITO_DECLARATIONS} from './constantes/nota-credito-declarations';

@NgModule({
  declarations: [
    ...NOTA_CREDITO_DECLARATIONS,
  ],
  imports: [
    ...NOTA_CREDITO_IMPORTS,
  ],
  providers: [
    ...NOTA_CREDITO_PROVIDERS,
  ]
})
export class NotaCreditoModule {
}
