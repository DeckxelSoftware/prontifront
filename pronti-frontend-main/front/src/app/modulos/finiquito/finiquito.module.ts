import {NgModule} from '@angular/core';
import {FINIQUITO_IMPORTS} from './constantes/finiquito-imports';
import {FINIQUITO_PROVIDERS} from './constantes/finiquito-providers';
import {FINIQUITO_DECLARATIONS} from './constantes/finiquito-declarations';
import {BreadcrumbModule} from "primeng/breadcrumb";
import {HttpTrabajadorModule} from "../trabajador/servicios/http-trabajador-module";
import {HttpListaValoresDetalleModule} from "../lista-valores-detalle/servicios/http-lista-valores-detalle-module";

@NgModule({
  declarations: [
    ...FINIQUITO_DECLARATIONS,
  ],
  imports: [
    ...FINIQUITO_IMPORTS,
    BreadcrumbModule,
    HttpTrabajadorModule,
    HttpListaValoresDetalleModule,
  ],
  providers: [
    ...FINIQUITO_PROVIDERS,
  ]
})
export class FiniquitoModule {
}
