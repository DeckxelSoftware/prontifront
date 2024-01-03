import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RutaAsientoContableCabeceraComponent} from './rutas/ruta-asiento-contable-cabecera/ruta-asiento-contable-cabecera.component';
import {
  RutaAsientoContableContabilidadComponent
} from "./rutas/ruta-asiento-contable-contabilidad/ruta-asiento-contable-contabilidad.component";

const routes: Routes = [
  {
    component: RutaAsientoContableCabeceraComponent,
    path: 'asiento-contable-cabecera'
  },
  {
    path: '',
    redirectTo: 'asiento-contable-cabecera',
  },
  {
    path: ':idAsientoContable/asiento-contable-det-adicional-modulo',
    loadChildren: () => import('../asiento-contable-det-adicional/asiento-contable-det-adicional.module')
      .then(m => m.AsientoContableDetAdicionalModule),
  },
  {
    path: ':idAsientoContable/transaccion-asiento-contable-modulo',
    loadChildren: () => import('../transaccion-asiento-contable/transaccion-asiento-contable.module')
      .then(m => m.TransaccionAsientoContableModule)
  },
  {
    path: 'gestion-asiento-contable-contabilidad',
    component: RutaAsientoContableContabilidadComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AsientoContableCabeceraRoutingModule {
}
