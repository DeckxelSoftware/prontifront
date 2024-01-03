import {NgModule} from '@angular/core';
import {INFORMACION_FINANCIERA_IMPORTS} from './constantes/informacion-financiera-imports';
import {INFORMACION_FINANCIERA_PROVIDERS} from './constantes/informacion-financiera-providers';
import {INFORMACION_FINANCIERA_DECLARATIONS} from './constantes/informacion-financiera-declarations';
import {BreadcrumbModule} from 'primeng/breadcrumb';

@NgModule({
  declarations: [
    ...INFORMACION_FINANCIERA_DECLARATIONS,
  ],
  imports: [
    ...INFORMACION_FINANCIERA_IMPORTS,
    BreadcrumbModule,
  ],
  providers: [
    ...INFORMACION_FINANCIERA_PROVIDERS,
  ]
})
export class InformacionFinancieraModule {
}
