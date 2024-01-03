import {NgModule} from '@angular/core';
import {PAGOS_2_IMPORTS} from './constantes/pagos2-imports';
import {PAGOS_2_PROVIDERS} from './constantes/pagos2-providers';
import {PAGOS_2_DECLARATIONS} from './constantes/pagos2-declarations';
import {RutaCalcularUtilidadesComponent} from './rutas/ruta-calcular-utilidades/ruta-calcular-utilidades.component';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import {RutaReporteDecCuartoComponent} from './rutas/ruta-reporte-dec-cuarto/ruta-reporte-dec-cuarto.component';
import {HttpPagos2Module} from "./servicios/http-pagos2-module";
import {HttpPeriodoLaboralModule} from "../periodo-laboral/servicios/http-periodo-laboral-module";
import {FormContainerModule} from "../../componentes/forms/form-container/form-container.module";
import { RutaReporteDecTerceroComponent } from './rutas/ruta-reporte-dec-tercero/ruta-reporte-dec-tercero.component';
import { ModalConfirmarUtilidadesComponent } from './componentes/modal-confirmar-utilidades/modal-confirmar-utilidades.component';
import { MatButtonModule } from '@angular/material/button';
import { RutaReporteUtilidadesComponent } from './rutas/ruta-reporte-utilidades/ruta-reporte-utilidades.component';
import { HttpTrabajadorModule } from '../trabajador/servicios/http-trabajador-module';
import { HttpPeriodoContableModule } from '../periodo-contable/servicios/http-periodo-contable-module';

@NgModule({
  declarations: [
    ...PAGOS_2_DECLARATIONS,
    RutaCalcularUtilidadesComponent,
    RutaReporteDecCuartoComponent,
    RutaReporteDecTerceroComponent,
    ModalConfirmarUtilidadesComponent,
    RutaReporteUtilidadesComponent,
  ],
  imports: [
    ...PAGOS_2_IMPORTS,
    BreadcrumbModule,
    HttpPagos2Module,
    HttpPeriodoLaboralModule,
    FormContainerModule,
    MatButtonModule,
    HttpTrabajadorModule,
    HttpPeriodoContableModule,
    HttpPeriodoLaboralModule,
  ],
  providers: [
    ...PAGOS_2_PROVIDERS,
  ] ,
  exports: [ModalConfirmarUtilidadesComponent]
})
export class Pagos2Module {
}
