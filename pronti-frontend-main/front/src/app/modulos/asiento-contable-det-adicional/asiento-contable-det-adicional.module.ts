import {NgModule} from '@angular/core';
import {ASIENTO_CONTABLE_DET_ADICIONAL_IMPORTS} from './constantes/asiento-contable-det-adicional-imports';
import {ASIENTO_CONTABLE_DET_ADICIONAL_PROVIDERS} from './constantes/asiento-contable-det-adicional-providers';
import {ASIENTO_CONTABLE_DET_ADICIONAL_DECLARATIONS} from './constantes/asiento-contable-det-adicional-declarations';
import {BreadcrumbModule} from 'primeng/breadcrumb';

@NgModule({
  declarations: [
    ...ASIENTO_CONTABLE_DET_ADICIONAL_DECLARATIONS,
  ],
  imports: [
    ...ASIENTO_CONTABLE_DET_ADICIONAL_IMPORTS,
    BreadcrumbModule,
  ],
  providers: [
    ...ASIENTO_CONTABLE_DET_ADICIONAL_PROVIDERS,
  ]
})
export class AsientoContableDetAdicionalModule {
}
