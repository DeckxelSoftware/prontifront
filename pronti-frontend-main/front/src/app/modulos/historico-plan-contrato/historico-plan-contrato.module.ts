import {NgModule} from '@angular/core';
import {HISTORICO_PLAN_CONTRATO_IMPORTS} from './constantes/historico-plan-contrato-imports';
import {HISTORICO_PLAN_CONTRATO_PROVIDERS} from './constantes/historico-plan-contrato-providers';
import {HISTORICO_PLAN_CONTRATO_DECLARATIONS} from './constantes/historico-plan-contrato-declarations';

@NgModule({
  declarations: [
    ...HISTORICO_PLAN_CONTRATO_DECLARATIONS,
  ],
  imports: [
    ...HISTORICO_PLAN_CONTRATO_IMPORTS,
  ],
  providers: [
    ...HISTORICO_PLAN_CONTRATO_PROVIDERS,
  ]
})
export class HistoricoPlanContratoModule {
}
