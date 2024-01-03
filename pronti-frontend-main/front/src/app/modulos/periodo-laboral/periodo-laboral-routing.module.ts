import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RutaPeriodoLaboralComponent} from './rutas/ruta-periodo-laboral/ruta-periodo-laboral.component';
import {RutaInformeIngresosComponent} from "./rutas/ruta-informe-ingresos/ruta-informe-ingresos.component";
import {RutaInformeEgresosComponent} from "./rutas/ruta-informe-egresos/ruta-informe-egresos.component";

const routes: Routes = [
  {
    component: RutaPeriodoLaboralComponent,
    path: 'periodo-laboral'
  },
  {
    component: RutaInformeIngresosComponent,
    path: 'informe-rol-ingresos'
  },
  {
    component: RutaInformeEgresosComponent,
    path: 'informe-rol-egresos'
  },
  {
    path: '',
    redirectTo: 'periodo-laboral',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PeriodoLaboralRoutingModule {
}
