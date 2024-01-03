import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RutaCuentaContableComponent} from './rutas/ruta-cuenta-contable/ruta-cuenta-contable.component';
import {RutaSaldoCuentaComponent} from "./rutas/ruta-saldo-cuenta/ruta-saldo-cuenta.component";
import {RutaCuentaAgenciaComponent} from "./rutas/ruta-cuenta-agencia/ruta-cuenta-agencia.component";
import {RutaBalanceResultadosComponent} from "./rutas/ruta-balance-resultados/ruta-balance-resultados.component";
import { RutaReporteBalanceComprobacionComponent } from './rutas/ruta-reporte-balance-comprobacion/ruta-reporte-balance-comprobacion.component';

const routes: Routes = [
  {
    component: RutaCuentaContableComponent,
    path: 'cuenta-contable-gestion'
  },
  {
    component: RutaSaldoCuentaComponent,
    path: 'saldo-cuenta'
  },
  {
    component: RutaCuentaAgenciaComponent,
    path: 'cuenta-agencia'
  },
  {
    component: RutaBalanceResultadosComponent,
    path: 'balance-resultados'
  },

  {
    component: RutaReporteBalanceComprobacionComponent,
    path: 'balance-comprobacion'
  },
  {
    path: '',
    redirectTo: 'cuenta-contable-gestion',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CuentaContableRoutingModule {
}
