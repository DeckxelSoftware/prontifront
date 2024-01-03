import {NgModule} from '@angular/core';
import {PRESTAMO_IMPORTS} from './constantes/prestamo-imports';
import {PRESTAMO_PROVIDERS} from './constantes/prestamo-providers';
import {PRESTAMO_DECLARATIONS} from './constantes/prestamo-declarations';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import {RutaSolicitudPrestamoComponent} from './rutas/ruta-solicitud-prestamo/ruta-solicitud-prestamo.component';
import {SolicitudPrestamoTablaModule} from "./componentes/solicitud-prestamo-tabla/solicitud-prestamo-tabla.module";
import {
  RutaConsultarEstadoCuentaComponent
} from './rutas/ruta-consultar-estado-cuenta/ruta-consultar-estado-cuenta.component';
import {
  ConsultaEstadoCuentaTablaModule
} from "./componentes/consulta-estado-cuenta-tabla/consulta-estado-cuenta-tabla.module";

import {RutaAprobacionPrestamoComponent} from './rutas/ruta-aprobacion-prestamo/ruta-aprobacion-prestamo.component';
import {AprobacionPrestamoTablaModule} from "./componentes/aprobacion-prestamo-tabla/aprobacion-prestamo-tabla.module";
import {ModalAprobacionPrestamoModule} from "./componentes/modal-aprobacion-prestamo/modal-aprobacion-prestamo.module";
import {HttpAbonoPrestamoModule} from "../abono-prestamo/servicios/http-abono-prestamo-module";
import { RutaInformePrestamoComponent } from './rutas/ruta-informe-prestamo/ruta-informe-prestamo.component';
import {FormContainerModule} from "../../componentes/forms/form-container/form-container.module";

@NgModule({
  declarations: [
    ...PRESTAMO_DECLARATIONS,
    RutaSolicitudPrestamoComponent,
    RutaConsultarEstadoCuentaComponent,
    RutaAprobacionPrestamoComponent,
    RutaInformePrestamoComponent,
  ],
  imports: [
    ...PRESTAMO_IMPORTS,
    BreadcrumbModule,
    SolicitudPrestamoTablaModule,
    ConsultaEstadoCuentaTablaModule,
    AprobacionPrestamoTablaModule,
    ModalAprobacionPrestamoModule,
    HttpAbonoPrestamoModule,
    FormContainerModule,
  ],
  providers: [
    ...PRESTAMO_PROVIDERS,
  ]
})
export class PrestamoModule {
}
