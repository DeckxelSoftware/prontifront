import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ReportesMenuPersonalComponent} from './reportes-menu-personal.component';

const routes: Routes = [
  {
    path: '',
    component: ReportesMenuPersonalComponent
  },
  {
    path: 'cargo-vacacion-modulo',
    loadChildren: () => import('../cargo-vacacion/cargo-vacacion.module')
      .then(m => m.CargoVacacionModule)
  },
  {
    path: 'periodo-laboral-modulo',
    loadChildren: () => import('../periodo-laboral/periodo-laboral.module')
      .then(m => m.PeriodoLaboralModule)
  },
  {
    path: 'pagos2',
    loadChildren: () => import('../pagos2/pagos2.module')
      .then(m => m.Pagos2Module)
  },
  {
    path: 'historico-rol-modulo',
    loadChildren: () => import('../historico-rol/historico-rol.module')
      .then(m => m.HistoricoRolModule)
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
export class ReportesMenuPersonalRoutingModule {
}
