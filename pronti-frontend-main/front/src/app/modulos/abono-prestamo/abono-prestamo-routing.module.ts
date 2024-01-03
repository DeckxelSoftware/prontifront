import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RutaAbonoPrestamoComponent} from './rutas/ruta-abono-prestamo/ruta-abono-prestamo.component';

const routes: Routes = [
  {
    component: RutaAbonoPrestamoComponent,
    path: 'abono-prestamo-gestion'
  },
  {
    path: '',
    redirectTo: 'abono-prestamo-gestion',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AbonoPrestamoRoutingModule {
}
