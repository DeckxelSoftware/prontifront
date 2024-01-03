import {NgModule} from '@angular/core';
import {DETALLE_NOVEDAD_ROL_PAGO_IMPORTS} from './constantes/detalle-novedad-rol-pago-imports';
import {DETALLE_NOVEDAD_ROL_PAGO_PROVIDERS} from './constantes/detalle-novedad-rol-pago-providers';
import {DETALLE_NOVEDAD_ROL_PAGO_DECLARATIONS} from './constantes/detalle-novedad-rol-pago-declarations';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import {
  DetalleNovedadRolPagoTrabajadorModule
} from './componentes/detalle-novedad-rol-pago-trabajador/detalle-novedad-rol-pago-trabajador.module';
import {HttpPeriodoLaboralModule} from "../periodo-laboral/servicios/http-periodo-laboral-module";
import {HttpAgenciaModule} from "../agencia/servicios/http-agencia-module";

@NgModule({
  declarations: [
    ...DETALLE_NOVEDAD_ROL_PAGO_DECLARATIONS,
  ],
  imports: [
    ...DETALLE_NOVEDAD_ROL_PAGO_IMPORTS,
    BreadcrumbModule,
    DetalleNovedadRolPagoTrabajadorModule,
    HttpPeriodoLaboralModule,
    HttpAgenciaModule,
  ],
  providers: [
    ...DETALLE_NOVEDAD_ROL_PAGO_PROVIDERS,
  ]
})
export class DetalleNovedadRolPagoModule {
}
