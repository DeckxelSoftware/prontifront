import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MenuRecursosComponent} from "./menu-recursos.component";

const routes: Routes = [
  {
    path: 'linea-impuesto-module',
    loadChildren: () => import('../linea-impuesto/linea-impuesto.module')
      .then((m) => m.LineaImpuestoModule)
  },
  {
    path: '',
    component: MenuRecursosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuRecursosRoutingModule {
}
