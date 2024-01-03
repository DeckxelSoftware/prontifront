import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RutaPrestamoComponent} from './rutas/ruta-prestamo/ruta-prestamo.component';
import {RutaSolicitudPrestamoComponent} from "./rutas/ruta-solicitud-prestamo/ruta-solicitud-prestamo.component";
import {
  RutaConsultarEstadoCuentaComponent
} from "./rutas/ruta-consultar-estado-cuenta/ruta-consultar-estado-cuenta.component";
import {RutaAprobacionPrestamoComponent} from "./rutas/ruta-aprobacion-prestamo/ruta-aprobacion-prestamo.component";
import {RutaInformePrestamoComponent} from "./rutas/ruta-informe-prestamo/ruta-informe-prestamo.component";

const routes: Routes = [
  {
    component: RutaPrestamoComponent,
    path: 'prestamo-gestion'
  },
  {
    component: RutaSolicitudPrestamoComponent,
    path: 'solicitud-prestamo'
  },
  {
    path: ':idPrestamo/abono-modulo',
    loadChildren: () => import('../abono-prestamo/abono-prestamo.module')
      .then(m => m.AbonoPrestamoModule)
  },
  {
    path: 'consultar-estado-cuenta',
    component: RutaConsultarEstadoCuentaComponent,
  },
  {
    path: 'aprobacion-prestamo',
    component: RutaAprobacionPrestamoComponent,
  },
  {
    path: 'informe-prestamo',
    component: RutaInformePrestamoComponent,
  },
  {
    path: '',
    redirectTo: 'prestamo-gestion',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrestamoRoutingModule {
}
