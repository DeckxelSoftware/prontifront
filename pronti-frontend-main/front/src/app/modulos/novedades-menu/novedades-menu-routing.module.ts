import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NovedadesMenuComponent} from './novedades-menu.component';

const routes: Routes = [
  {
    path: 'detalle-novedad-rol-pago-modulo',
    loadChildren: () => import('../detalle-novedad-rol-pago/detalle-novedad-rol-pago.module')
      .then(m => m.DetalleNovedadRolPagoModule)
  },
  {
    path: '',
    component: NovedadesMenuComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NovedadesMenuRoutingModule {
}
