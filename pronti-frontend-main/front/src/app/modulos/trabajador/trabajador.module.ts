import {NgModule} from '@angular/core';
import {TRABAJADOR_IMPORTS} from './constantes/trabajador-imports';
import {TRABAJADOR_PROVIDERS} from './constantes/trabajador-providers';
import {TRABAJADOR_DECLARATIONS} from './constantes/trabajador-declarations';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import {
  HttpDetalleNovedadRolPagoModule
} from '../detalle-novedad-rol-pago/servicios/http-detalle-novedad-rol-pago-module';
import {HttpRubrosRolModule} from '../rubros-rol/servicios/http-rubros-rol-module';
import {RutaIngresosDescuentosComponent} from './rutas/ruta-ingresos-descuentos/ruta-ingresos-descuentos.component';
import {DescuentoTablaModule} from './componentes/descuento-tabla/descuento-tabla.module';
import {HttpListaValoresDetalleModule} from '../lista-valores-detalle/servicios/http-lista-valores-detalle-module';
import {TabViewModule} from 'primeng/tabview';
import {IngresoTablaModule} from './componentes/ingreso-tabla/ingreso-tabla.module';
import {BeneficioTablaModule} from './componentes/beneficio-tabla/beneficio-tabla.module';
import {HttpCuentaContableModule} from "../cuenta-contable/servicios/http-cuenta-contable-module";
import {HttpConfiguracionGeneralModule} from '../configuracion-general/servicios/http-configuracion-general-module';
import {
  CaracteristicasAnualesTrabajadorComponent
} from './rutas/caracteristicas-anuales-trabajador/caracteristicas-anuales-trabajador.component';
import {
  TrabajadorTablaCaracteristicasAnualesModule
} from "./componentes/trabajador-tabla-caracteristicas-anuales/trabajador-tabla-caracteristicas-anuales.module";
import {HttpPagos1Module} from "../pagos1/servicios/http-pagos1-module";
import {HttpAgenciaModule} from "../agencia/servicios/http-agencia-module";
import {RutaInformeNominaComponent} from './rutas/ruta-informe-nomina/ruta-informe-nomina.component';
import {FormContainerModule} from "../../componentes/forms/form-container/form-container.module";
import {HttpRolPagoModule} from "../rol-pago/servicios/http-rol-pago-module";


@NgModule({
  declarations: [
    ...TRABAJADOR_DECLARATIONS,
    RutaIngresosDescuentosComponent,
    CaracteristicasAnualesTrabajadorComponent,
    RutaInformeNominaComponent,
  ],
  imports: [
    ...TRABAJADOR_IMPORTS,
    BreadcrumbModule,
    HttpDetalleNovedadRolPagoModule,
    HttpRubrosRolModule,
    DescuentoTablaModule,
    HttpListaValoresDetalleModule,
    TabViewModule,
    IngresoTablaModule,
    BeneficioTablaModule,
    HttpCuentaContableModule,
    HttpConfiguracionGeneralModule,
    TrabajadorTablaCaracteristicasAnualesModule,
    HttpPagos1Module,
    HttpAgenciaModule,
    FormContainerModule,
    HttpRolPagoModule,
  ],
  providers: [
    ...TRABAJADOR_PROVIDERS,
  ]
})
export class TrabajadorModule {
}
