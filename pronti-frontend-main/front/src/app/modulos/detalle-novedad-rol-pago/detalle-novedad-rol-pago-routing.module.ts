import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {
  RutaDetalleNovedadRolPagoComponent
} from './rutas/ruta-detalle-novedad-rol-pago/ruta-detalle-novedad-rol-pago.component';
import {
  RutaDetalleNovedadRolPagoTrabajadorComponent
} from "./rutas/ruta-detalle-novedad-rol-pago-trabajador/ruta-detalle-novedad-rol-pago-trabajador.component";

const routes: Routes = [
  {
    component: RutaDetalleNovedadRolPagoComponent,
    path: 'detalle-novedad-rol-pago-tipo'
  },
  {
    component: RutaDetalleNovedadRolPagoTrabajadorComponent,
    path: 'detalle-novedad-rol-pago-trabajador'
  },
  {
    path: '',
    redirectTo: 'detalle-novedad-rol-pago-tipo',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetalleNovedadRolPagoRoutingModule {
}
