import {NgModule} from '@angular/core';
import {PERIODO_LABORAL_IMPORTS} from './constantes/periodo-laboral-imports';
import {PERIODO_LABORAL_PROVIDERS} from './constantes/periodo-laboral-providers';
import {PERIODO_LABORAL_DECLARATIONS} from './constantes/periodo-laboral-declarations';
import {RutaInformeIngresosComponent} from './rutas/ruta-informe-ingresos/ruta-informe-ingresos.component';
import {BreadcrumbModule} from "primeng/breadcrumb";
import {FormContainerModule} from "../../componentes/forms/form-container/form-container.module";
import {HttpPeriodoLaboralModule} from "./servicios/http-periodo-laboral-module";
import {HttpRolPagoModule} from "../rol-pago/servicios/http-rol-pago-module";
import { RutaInformeEgresosComponent } from './rutas/ruta-informe-egresos/ruta-informe-egresos.component';

@NgModule({
  declarations: [
    ...PERIODO_LABORAL_DECLARATIONS,
    RutaInformeIngresosComponent,
    RutaInformeEgresosComponent,
  ],
  imports: [
    ...PERIODO_LABORAL_IMPORTS,
    BreadcrumbModule,
    FormContainerModule,
    HttpPeriodoLaboralModule,
    HttpRolPagoModule
  ],
  providers: [
    ...PERIODO_LABORAL_PROVIDERS,
  ]
})
export class PeriodoLaboralModule {
}
