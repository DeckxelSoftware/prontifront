import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RutaPlanComponent} from './rutas/ruta-plan/ruta-plan.component';

const routes: Routes = [
  {
    component: RutaPlanComponent,
    path: 'plan-gestion'
  },
  {
    path: ':idPlan/:plazoMaximo/precio-modulo',
    loadChildren: () => import('../../modulos/precio/precio.module')
      .then(m => m.PrecioModule)
  },
  {
    path: '',
    redirectTo: 'plan-gestion',
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlanRoutingModule {
}
