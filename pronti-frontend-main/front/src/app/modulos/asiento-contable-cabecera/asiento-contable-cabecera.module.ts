import {NgModule} from '@angular/core';
import {ASIENTO_CONTABLE_CABECERA_IMPORTS} from './constantes/asiento-contable-cabecera-imports';
import {ASIENTO_CONTABLE_CABECERA_PROVIDERS} from './constantes/asiento-contable-cabecera-providers';
import {ASIENTO_CONTABLE_CABECERA_DECLARATIONS} from './constantes/asiento-contable-cabecera-declarations';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import {HttpCuentaContableModule} from '../cuenta-contable/servicios/http-cuenta-contable-module';
import {HttpChequeModule} from '../cheque/servicios/http-cheque-module';
import { RutaAsientoContableContabilidadComponent } from './rutas/ruta-asiento-contable-contabilidad/ruta-asiento-contable-contabilidad.component';

@NgModule({
  declarations: [
    ...ASIENTO_CONTABLE_CABECERA_DECLARATIONS,
    RutaAsientoContableContabilidadComponent,
  ],
  imports: [
    ...ASIENTO_CONTABLE_CABECERA_IMPORTS,
    BreadcrumbModule,
    HttpCuentaContableModule,
    HttpChequeModule
  ],
  providers: [
    ...ASIENTO_CONTABLE_CABECERA_PROVIDERS,
  ]
})
export class AsientoContableCabeceraModule {
}
