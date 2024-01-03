import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PrestamosMenuComponent} from './prestamos-menu.component';

const routes: Routes = [
  {
    path: '',
    component: PrestamosMenuComponent
  },
  {
    path: 'prestamo-modulo',
    loadChildren: () => import('../prestamo/prestamo.module')
      .then(m => m.PrestamoModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrestamosMenuRoutingModule {
}
