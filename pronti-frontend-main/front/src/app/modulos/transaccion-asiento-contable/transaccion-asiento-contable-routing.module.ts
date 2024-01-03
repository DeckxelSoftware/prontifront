import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {
  RutaTransaccionAsientoContableComponent
} from './rutas/ruta-transaccion-asiento-contable/ruta-transaccion-asiento-contable.component';
import {
  RutaAsientoContableContabilidadComponent
} from "../asiento-contable-cabecera/rutas/ruta-asiento-contable-contabilidad/ruta-asiento-contable-contabilidad.component";
import {
  RutaTransaccionContableContabilidadComponent
} from "./rutas/ruta-transaccion-contable-contabilidad/ruta-transaccion-contable-contabilidad.component";


const routes: Routes = [

  {
    path: '',
    redirectTo: 'transaccion-asiento-contable',
  },
  {
    component: RutaTransaccionAsientoContableComponent,
    path: 'transaccion-asiento-contable'
  },
  {
    component: RutaTransaccionContableContabilidadComponent,
    path: 'transaccion-contable-contabilidad'
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransaccionAsientoContableRoutingModule {
}
