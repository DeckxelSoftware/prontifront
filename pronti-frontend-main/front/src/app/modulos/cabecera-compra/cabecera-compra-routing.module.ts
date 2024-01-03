import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RutaCabeceraCompraComponent} from './rutas/ruta-cabecera-compra/ruta-cabecera-compra.component';
import {RutaFacturaFisicaComponent} from "./rutas/factura-fisica/factura-fisica.component";

const routes: Routes = [
  {
    component: RutaCabeceraCompraComponent,
    path: 'factura-electronica'
  },
  {
    component: RutaFacturaFisicaComponent,
    path: 'factura-fisica'
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CabeceraCompraRoutingModule {
}
