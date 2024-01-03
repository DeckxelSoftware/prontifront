import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PersonalComponent} from './personal.component';

const routes: Routes = [
  {
    path: '',
    component: PersonalComponent
  },
  {
    path: 'agencias-modulo',
    loadChildren: () => import('../agencia/agencia.module')
      .then(m => m.AgenciaModule)
  },
  {
    path: 'trabajadores-modulo',
    loadChildren: () => import('../trabajador/trabajador.module')
      .then(m => m.TrabajadorModule)
  },
  {
    path: 'supervisores-modulo',
    loadChildren: () => import('../supervisor/supervisor.module')
      .then(m => m.SupervisorModule)
  },
  {
    path: 'vendedores-modulo',
    loadChildren: () => import('../vendedor/vendedor.module')
      .then(m => m.VendedorModule)
  },
  {
    path: 'area-modulo',
    loadChildren: () => import('../area/area.module')
      .then(m => m.AreaModule)
  },
  {
    path: 'rubros-rol-modulo',
    loadChildren: () => import('../rubros-rol/rubros-rol.module')
      .then(m => m.RubrosRolModule)
  },
  {
    path: 'division-administrativa-modulo',
    loadChildren: () => import('../division-administrativa/division-administrativa.module')
      .then(m => m.DivisionAdministrativaModule)
  },
  {
    path: 'periodo-laboral-modulo',
    loadChildren: () => import('../periodo-laboral/periodo-laboral.module')
      .then(m => m.PeriodoLaboralModule)
  },
  {
    path: 'rol-pago-modulo',
    loadChildren: () => import('../rol-pago/rol-pago.module')
      .then(m => m.RolPagoModule)
  },
  {
    path: 'cuenta-contable-modulo',
    loadChildren: () => import('../cuenta-contable/cuenta-contable.module')
      .then(m => m.CuentaContableModule)
  },
  {
    path: 'finiquito-modulo',
    loadChildren: () => import('../finiquito/finiquito.module')
      .then(m => m.FiniquitoModule)
  },
  {
    path: 'reportes-personal',
    loadChildren: () => import('../reportes-menu-personal/reportes-menu-personal.module')
      .then(m => m.ReportesMenuPersonalModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonalRoutingModule {
}
