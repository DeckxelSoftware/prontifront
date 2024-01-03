import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RutaImpuestoRentaComponent} from './rutas/ruta-impuesto-renta/ruta-impuesto-renta.component';

const routes: Routes = [
  {
    component: RutaImpuestoRentaComponent,
    path: 'impuesto-renta-gestion'
  },
  {
    path: '',
    redirectTo: 'impuesto-renta-gestion',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImpuestoRentaRoutingModule {
}
