import {NgModule} from '@angular/core';
import {PERIODO_CONTABLE_IMPORTS} from './constantes/periodo-contable-imports';
import {PERIODO_CONTABLE_PROVIDERS} from './constantes/periodo-contable-providers';
import {PERIODO_CONTABLE_DECLARATIONS} from './constantes/periodo-contable-declarations';
import {BreadcrumbModule} from 'primeng/breadcrumb';

@NgModule({
  declarations: [
    ...PERIODO_CONTABLE_DECLARATIONS,
  ],
  imports: [
    ...PERIODO_CONTABLE_IMPORTS,
    BreadcrumbModule,
  ],
  providers: [
    ...PERIODO_CONTABLE_PROVIDERS,
  ]
})
export class PeriodoContableModule {
}
