import {NgModule} from '@angular/core';
import {CONFIGURACION_GENERAL_IMPORTS} from './constantes/configuracion-general-imports';
import {CONFIGURACION_GENERAL_PROVIDERS} from './constantes/configuracion-general-providers';
import {CONFIGURACION_GENERAL_DECLARATIONS} from './constantes/configuracion-general-declarations';
import {BreadcrumbModule} from 'primeng/breadcrumb';

@NgModule({
  declarations: [
    ...CONFIGURACION_GENERAL_DECLARATIONS,
  ],
    imports: [
        ...CONFIGURACION_GENERAL_IMPORTS,
        BreadcrumbModule,
    ],
  providers: [
    ...CONFIGURACION_GENERAL_PROVIDERS,
  ]
})
export class ConfiguracionGeneralModule {
}
