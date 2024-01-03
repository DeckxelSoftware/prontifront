import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RutaFacturaComponent} from './rutas/ruta-factura/ruta-factura.component';

const routes: Routes = [
  {
    component: RutaFacturaComponent,
    path: 'factura-gestion'
  },
  // {
  //   path: 'factura-gestion/:itNumeroDocumento',
  //   component: RutaFacturaComponent,
  // },
  {
    path: '',
    redirectTo: 'factura-gestion',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FacturaRoutingModule {
}
