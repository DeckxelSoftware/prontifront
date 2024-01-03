import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RutaAsientoContableDetAdicionalComponent} from './rutas/ruta-asiento-contable-det-adicional/ruta-asiento-contable-det-adicional.component';

const routes: Routes = [
  {
    component: RutaAsientoContableDetAdicionalComponent,
    path: 'asiento-contable-det-adicional'
  },
  {
    path: '',
    redirectTo: 'asiento-contable-det-adicional',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AsientoContableDetAdicionalRoutingModule {
}
