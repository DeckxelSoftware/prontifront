import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MenuCaracteristicasAnualesComponent} from "./menu-caracteristicas-anuales.component";

const routes: Routes = [
  {
    path: '',
    component: MenuCaracteristicasAnualesComponent
  },
  {
    path: 'calculo-decimo-cuarto',
    loadChildren: () => import('../pagos1/pagos1.module')
      .then((m) => m.Pagos1Module)
  },
  {
    path: 'trabajador-module',
    loadChildren: () => import('../trabajador/trabajador.module')
      .then((m) => m.TrabajadorModule)
  },
  {
    path: 'pagos2-module',
    loadChildren: () => import('../pagos2/pagos2.module')
      .then((m) => m.Pagos2Module)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuCaracteristicasAnualesRoutingModule {
}
