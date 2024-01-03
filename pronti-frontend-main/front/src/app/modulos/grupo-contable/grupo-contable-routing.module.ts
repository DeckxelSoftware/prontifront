import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RutaGrupoContableComponent} from './rutas/ruta-grupo-contable/ruta-grupo-contable.component';

const routes: Routes = [
  {
    component: RutaGrupoContableComponent,
    path: 'grupo-contable-gestion'
  },
  // {
  //   path: ':idGrupoContable/subgrupo-contable-modulo',
  //   loadChildren: () => import('../subgrupo-contable/subgrupo-contable.module')
  //     .then(m => m.SubgrupoContableModule)
  // },
  {
    path: '',
    redirectTo: 'grupo-contable-gestion',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GrupoContableRoutingModule {
}
