import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RutaCobroComponent} from './rutas/ruta-cobro/ruta-cobro.component';
import {RutaAnulacionCobroComponent} from "./rutas/ruta-anulacion-cobro/ruta-anulacion-cobro.component";
import {RutaCuentasPorCobrarComponent} from "./rutas/ruta-cuentas-por-cobrar/ruta-cuentas-por-cobrar.component";

const routes: Routes = [
  {
    component: RutaCobroComponent,
    path: 'cobro'
  },
  {
    component: RutaAnulacionCobroComponent,
    path: 'anulacion-cobro',
  },
  {
    component: RutaCuentasPorCobrarComponent,
    path: 'cuentas-por-cobrar'
  },
  {
    path: '',
    redirectTo: 'cobro',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CobroRoutingModule {
}
