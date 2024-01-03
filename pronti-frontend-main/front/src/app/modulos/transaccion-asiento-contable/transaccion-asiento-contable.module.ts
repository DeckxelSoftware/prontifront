import {NgModule} from '@angular/core';
import {TRANSACCION_ASIENTO_CONTABLE_IMPORTS} from './constantes/transaccion-asiento-contable-imports';
import {TRANSACCION_ASIENTO_CONTABLE_PROVIDERS} from './constantes/transaccion-asiento-contable-providers';
import {TRANSACCION_ASIENTO_CONTABLE_DECLARATIONS} from './constantes/transaccion-asiento-contable-declarations';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import { RutaTransaccionContableContabilidadComponent } from './rutas/ruta-transaccion-contable-contabilidad/ruta-transaccion-contable-contabilidad.component';
import {
  HttpAsientoContableCabeceraModule
} from "../asiento-contable-cabecera/servicios/http-asiento-contable-cabecera-module";
import {PipesModule} from "../../pipes/pipes.module";

@NgModule({
  declarations: [
    ...TRANSACCION_ASIENTO_CONTABLE_DECLARATIONS,
    RutaTransaccionContableContabilidadComponent,
  ],
  imports: [
    ...TRANSACCION_ASIENTO_CONTABLE_IMPORTS,
    BreadcrumbModule,
    HttpAsientoContableCabeceraModule,
    PipesModule

  ],
  providers: [
    ...TRANSACCION_ASIENTO_CONTABLE_PROVIDERS,
  ]
})
export class TransaccionAsientoContableModule {
}
