import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RutaContratoComponent} from './rutas/ruta-contrato/ruta-contrato.component';
import {RutaCrearContratoComponent} from './rutas/ruta-crear-contrato/ruta-crear-contrato.component';
import {RutaEditarContratoComponent} from './rutas/ruta-editar-contrato/ruta-editar-contrato.component';
import {RutaUnificacionContratoComponent} from './rutas/ruta-unificacion-contrato/ruta-unificacion-contrato.component';
import {RutaReactivarContratoComponent} from './rutas/ruta-reactivar-contrato/ruta-reactivar-contrato.component';
import {RutaCesionDerechosComponent} from './rutas/ruta-cesion-derechos/ruta-cesion-derechos.component';
import {RutaDesistirComponent} from './rutas/ruta-desistir/ruta-desistir.component';
import {RutaDevolucionComponent} from './rutas/ruta-devolucion/ruta-devolucion.component';
import {RutaEstadoCuentaComponent} from './rutas/ruta-estado-cuenta/ruta-estado-cuenta.component';
import {RutaLiquidacionComponent} from './rutas/ruta-liquidacion/ruta-liquidacion.component';
import {RutaInformeClienteComponent} from "./rutas/ruta-informe-cliente/ruta-informe-cliente.component";
import { RutaReporteAsambleaComponent } from './rutas/ruta-reporte-asamblea/ruta-reporte-asamblea.component';

const routes: Routes = [
  {
    component: RutaContratoComponent,
    path: 'contrato'
  },
  {
    component: RutaCrearContratoComponent,
    path: 'crear-contrato'
  },
  {
    component: RutaCrearContratoComponent,
    path: ':idContrato/editar-contrato'
  },
  {
    component: RutaEditarContratoComponent,
    path: ':idContrato/cambiar-contrato'
  },
  {
    path: ':idContrato/historico-estado-contrato-modulo',
    loadChildren: () => import('../../modulos/historico-plan-contrato/historico-plan-contrato.module')
      .then(m => m.HistoricoPlanContratoModule)
  },
  {
    path: ':idContrato/cuota-modulo',
    loadChildren: () => import('../../modulos/cuota/cuota.module')
      .then(m => m.CuotaModule)
  },
  {
    path: ':idContrato/cobro-modulo',
    loadChildren: () => import('../../modulos/cobro/cobro.module')
      .then(m => m.CobroModule)
  },
  {
    path: ':idContrato/refinanciamiento-modulo',
    loadChildren: () => import('../../modulos/refinanciamiento/refinanciamiento.module')
      .then(m => m.RefinanciamientoModule)
  },
  {
    path: ':idContrato/acciones-contrato',
    component: RutaUnificacionContratoComponent,
  },
  {
    path: 'acciones-contrato/crear-unificacion-contrato',
    component: RutaCrearContratoComponent,
  },
  {
    path: ':idContrato/reactivar-contrato',
    component: RutaReactivarContratoComponent,
  },
  {
    path: ':idContrato/desistir-contrato',
    component: RutaDesistirComponent,
  },
  {
    path: ':idContrato/cesion-derechos',
    component: RutaCesionDerechosComponent,
  },
  {
    path: ':idContrato/devolucion-contrato',
    component: RutaDevolucionComponent,
  },
  {
    path: ':idContrato/estado-cuenta',
    component: RutaEstadoCuentaComponent,
  },
  {
    path: ':idContrato/liquidacion',
    component: RutaLiquidacionComponent,
  },

  {
    path: 'informe-clientes',
    component: RutaInformeClienteComponent,
  },
 {
    path: 'informe-asamblea',
    component: RutaReporteAsambleaComponent,
  },
  {
    path: '',
    redirectTo: 'contrato',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContratoRoutingModule {
}
