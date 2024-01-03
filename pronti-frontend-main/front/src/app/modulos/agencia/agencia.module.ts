import {NgModule} from '@angular/core';
import {AGENCIA_IMPORTS} from './constantes/agencia-imports';
import {AGENCIA_PROVIDERS} from './constantes/agencia-providers';
import {AGENCIA_DECLARATIONS} from './constantes/agencia-declarations';

@NgModule({
  declarations: [
    ...AGENCIA_DECLARATIONS,
  ],
  imports: [
    ...AGENCIA_IMPORTS,
  ],
  providers: [
    ...AGENCIA_PROVIDERS,
  ]
})
export class AgenciaModule {
}
