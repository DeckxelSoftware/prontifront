import {NgModule} from '@angular/core';
import {HISTORIAL_LABORAL_IMPORTS} from './constantes/historial-laboral-imports';
import {HISTORIAL_LABORAL_PROVIDERS} from './constantes/historial-laboral-providers';
import {HISTORIAL_LABORAL_DECLARATIONS} from './constantes/historial-laboral-declarations';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import {
  HttpDivisionAdministrativaModule
} from "../division-administrativa/servicios/http-division-administrativa-module";
import {HttpConfiguracionGeneralModule} from "../configuracion-general/servicios/http-configuracion-general-module";
import {HttpTrabajadorModule} from "../trabajador/servicios/http-trabajador-module";

@NgModule({
  declarations: [
    ...HISTORIAL_LABORAL_DECLARATIONS,
  ],
  imports: [
    ...HISTORIAL_LABORAL_IMPORTS,
    BreadcrumbModule,
    HttpDivisionAdministrativaModule,
    HttpConfiguracionGeneralModule,
    HttpTrabajadorModule,
  ],
  providers: [
    ...HISTORIAL_LABORAL_PROVIDERS,
  ]
})
export class HistorialLaboralModule {
}
