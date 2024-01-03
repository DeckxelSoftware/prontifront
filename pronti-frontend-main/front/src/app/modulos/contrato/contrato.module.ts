import {NgModule} from '@angular/core';
import {CONTRATO_IMPORTS} from './constantes/contrato-imports';
import {CONTRATO_PROVIDERS} from './constantes/contrato-providers';
import {CONTRATO_DECLARATIONS} from './constantes/contrato-declarations';
import {RutaCrearContratoComponent} from './rutas/ruta-crear-contrato/ruta-crear-contrato.component';
import {PlanTablaModule} from '../plan/componentes/plan-tabla/plan-tabla.module';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import {HttpPlanModule} from '../plan/servicios/http-plan-module';
import {FormContainerModule} from '../../componentes/forms/form-container/form-container.module';
import {AccordionModule} from 'primeng/accordion';
import {FormlyModule} from '@ngx-formly/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AutocompleteFormlyComponent} from './componentes/autocomplete-formly/autocomplete-formly.component';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {HttpClienteModule} from '../cliente/servicios/http-cliente-module';
import {HttpVendedorModule} from '../vendedor/servicios/http-vendedor-module';
import {ClienteTablaModule} from '../cliente/componentes/cliente-tabla/cliente-tabla.module';
import {VendedorTablaModule} from '../vendedor/componentes/vendedor-tabla/vendedor-tabla.module';
import {HttpTrabajadorModule} from '../trabajador/servicios/http-trabajador-module';
import {HttpAgenciaModule} from '../agencia/servicios/http-agencia-module';
import {CuotaTablaModule} from '../cuota/componentes/cuota-tabla/cuota-tabla.module';
import {HttpCuotaModule} from '../cuota/servicios/http-cuota-module';
import {EstadoContratoModule} from '../../servicios/estado-contrato/estado-contrato.module';
import {HttpConfiguracionGeneralModule} from '../configuracion-general/servicios/http-configuracion-general-module';
import {RutaEditarContratoComponent} from './rutas/ruta-editar-contrato/ruta-editar-contrato.component';
import {ModalPlanComponent} from './componentes/modal-plan/modal-plan.component';
import {RutaUnificacionContratoComponent} from './rutas/ruta-unificacion-contrato/ruta-unificacion-contrato.component';
import {FieldsetModule} from 'primeng/fieldset';
import {RutaReactivarContratoComponent} from './rutas/ruta-reactivar-contrato/ruta-reactivar-contrato.component';
import {PipesModule} from '../../pipes/pipes.module';
import {RutaCesionDerechosComponent} from './rutas/ruta-cesion-derechos/ruta-cesion-derechos.component';
import {StorageCesionDerechosService} from "./servicios/storage-cesion-derechos.service";
import {
  ModalConfirmarCesionDerechosComponent
} from './componentes/modal-confirmar-cesion-derechos/modal-confirmar-cesion-derechos.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatTableModule} from "@angular/material/table";
import {CuotaUnificacionTablaModule} from '../cuota/componentes/cuota-unificacion-tabla/cuota-unificacion-tabla.module';
import {ModalContratoComponent} from './componentes/modal-contrato/modal-contrato.component';
import {RutaDesistirComponent} from './rutas/ruta-desistir/ruta-desistir.component';
import {
  ContratoCesionDerechoTablaModule
} from './componentes/contrato-cesion-derecho-tabla/contrato-cesion-derecho-tabla.module';
import {RutaDevolucionComponent} from './rutas/ruta-devolucion/ruta-devolucion.component';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {CalendarModule} from 'primeng/calendar';
import {RutaEstadoCuentaComponent} from './rutas/ruta-estado-cuenta/ruta-estado-cuenta.component';
import {MatMenuModule} from '@angular/material/menu';

import {
  HistoricoPlanContratoTablaModule
} from '../historico-plan-contrato/componentes/historico-plan-contrato-tabla/historico-plan-contrato-tabla.module';
import {
  HttpHistoricoPlanContratoModule
} from '../historico-plan-contrato/servicios/http-historico-plan-contrato-module';
import {SharedComponentesModule} from "../../shared/shared-componentes.module";
import {RutaLiquidacionComponent} from './rutas/ruta-liquidacion/ruta-liquidacion.component';

import {HttpListaValoresDetalleModule} from "../lista-valores-detalle/servicios/http-lista-valores-detalle-module";
import {
  HttpCuentaBancariaEmpresaModule
} from "../cuenta-bancaria-empresa/servicios/http-cuenta-bancaria-empresa-module";
import {InputTextModule} from "primeng/inputtext";
import {InputNumberModule} from "primeng/inputnumber";
import {DropdownModule} from "primeng/dropdown";
import {DetallePagoTablaModule} from "../cuota/componentes/detalle-pago-tabla/detalle-pago-tabla.module";
import {RutaInformeClienteComponent} from './rutas/ruta-informe-cliente/ruta-informe-cliente.component';
import {RutaReporteAsambleaComponent} from './rutas/ruta-reporte-asamblea/ruta-reporte-asamblea.component';
import {HttpProveedorModule} from "../proveedor/servicios/http-proveedor-module";
import { ModalMoverGrupoComponent } from './componentes/modal-mover-grupo/modal-mover-grupo.component';
import { HttpClienteEnGrupoModule } from '../cliente-en-grupo/servicios/http-cliente-en-grupo-module';


@NgModule({
  declarations: [
    ...CONTRATO_DECLARATIONS,
    RutaCrearContratoComponent,
    AutocompleteFormlyComponent,
    RutaEditarContratoComponent,
    ModalPlanComponent,
    RutaUnificacionContratoComponent,
    RutaCesionDerechosComponent,
    ModalConfirmarCesionDerechosComponent,
    RutaReactivarContratoComponent,
    ModalContratoComponent,
    RutaDesistirComponent,
    RutaDevolucionComponent,
    RutaEstadoCuentaComponent,
    RutaLiquidacionComponent,
    RutaInformeClienteComponent,
    RutaReporteAsambleaComponent,
    ModalMoverGrupoComponent,
  ],
  imports: [
    ...CONTRATO_IMPORTS,
    PlanTablaModule,
    BreadcrumbModule,
    HttpPlanModule,
    HttpClienteModule,
    HttpVendedorModule,
    HttpTrabajadorModule,
    HttpAgenciaModule,
    HttpCuotaModule,
    HttpConfiguracionGeneralModule,
    EstadoContratoModule,
    FormContainerModule,
    AccordionModule,
    FormlyModule,
    ReactiveFormsModule,
    AutoCompleteModule,
    ClienteTablaModule,
    VendedorTablaModule,
    CuotaTablaModule,
    FieldsetModule,
    PipesModule,
    CuotaUnificacionTablaModule,
    MatDialogModule,
    MatTableModule,
    ContratoCesionDerechoTablaModule,
    TableModule,
    ButtonModule,
    MatMenuModule,
    HistoricoPlanContratoTablaModule,
    HttpHistoricoPlanContratoModule,
    SharedComponentesModule,
    HttpListaValoresDetalleModule,
    HttpCuentaBancariaEmpresaModule,
    InputNumberModule,
    FormsModule,
    DetallePagoTablaModule,
    AutoCompleteModule,
    InputTextModule,
    CalendarModule,
    DropdownModule,
    HttpProveedorModule,
    HttpClienteEnGrupoModule,
  ],
  providers: [
    ...CONTRATO_PROVIDERS,
    StorageCesionDerechosService
  ]
})
export class ContratoModule {
}
