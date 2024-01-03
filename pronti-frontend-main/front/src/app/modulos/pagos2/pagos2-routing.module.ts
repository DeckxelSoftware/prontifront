import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RutaPagos2Component} from './rutas/ruta-pagos2/ruta-pagos2.component';
import {RutaCalcularUtilidadesComponent} from './rutas/ruta-calcular-utilidades/ruta-calcular-utilidades.component';
import {RutaReporteDecCuartoComponent} from "./rutas/ruta-reporte-dec-cuarto/ruta-reporte-dec-cuarto.component";
import {RutaReporteDecTerceroComponent} from "./rutas/ruta-reporte-dec-tercero/ruta-reporte-dec-tercero.component";
import { RutaReporteUtilidadesComponent } from './rutas/ruta-reporte-utilidades/ruta-reporte-utilidades.component';

const routes: Routes = [
  {
    component: RutaPagos2Component,
    path: 'calculo-dec-cuarto'
  },
  {
    component: RutaCalcularUtilidadesComponent,
    path: 'calcular-utilidades'
  },
  {
    component: RutaReporteDecCuartoComponent,
    path: 'reporte-dec-cuarto'
  },
  {
    component: RutaReporteDecTerceroComponent,
    path: 'reporte-dec-tercero'
  },
  {
    component: RutaReporteUtilidadesComponent,
    path: 'reporte-utilidades'
  },
  {
    path: '',
    redirectTo: 'calculo-dec-cuarto',
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Pagos2RoutingModule {
}
