import {NgModule} from '@angular/core';
import {CUENTA_CONTABLE_IMPORTS} from './constantes/cuenta-contable-imports';
import {CUENTA_CONTABLE_PROVIDERS} from './constantes/cuenta-contable-providers';
import {CUENTA_CONTABLE_DECLARATIONS} from './constantes/cuenta-contable-declarations';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import {RutaSaldoCuentaComponent} from './rutas/ruta-saldo-cuenta/ruta-saldo-cuenta.component';
import {SaldoCuentaTablaModule} from "./componentes/saldo-cuenta-tabla/saldo-cuenta-tabla.module";
import {RutaCuentaAgenciaComponent} from './rutas/ruta-cuenta-agencia/ruta-cuenta-agencia.component';
import {CuentaAgenciaModule} from "./componentes/cuenta-agencia/cuenta-agencia.module";
import {HttpAgenciaModule} from "../agencia/servicios/http-agencia-module";
import {HttpRubrosRolModule} from "../rubros-rol/servicios/http-rubros-rol-module";
import { RutaBalanceResultadosComponent } from './rutas/ruta-balance-resultados/ruta-balance-resultados.component';
import {FormContainerModule} from "../../componentes/forms/form-container/form-container.module";
import { RutaReporteBalanceComprobacionComponent } from './rutas/ruta-reporte-balance-comprobacion/ruta-reporte-balance-comprobacion.component';

@NgModule({
  declarations: [
    ...CUENTA_CONTABLE_DECLARATIONS,
    RutaSaldoCuentaComponent,
    RutaCuentaAgenciaComponent,
    RutaBalanceResultadosComponent,
    RutaReporteBalanceComprobacionComponent,
  ],
    imports: [
        ...CUENTA_CONTABLE_IMPORTS,
        BreadcrumbModule,
        SaldoCuentaTablaModule,
        CuentaAgenciaModule,
        HttpAgenciaModule,
        HttpRubrosRolModule,
        FormContainerModule,
    ],
  providers: [
    ...CUENTA_CONTABLE_PROVIDERS,
  ]
})
export class CuentaContableModule {
}
