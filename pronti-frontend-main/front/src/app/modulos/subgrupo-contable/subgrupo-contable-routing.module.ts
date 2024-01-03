import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RutaSubgrupoContableComponent} from './rutas/ruta-subgrupo-contable/ruta-subgrupo-contable.component';

const routes: Routes = [
  {
    component: RutaSubgrupoContableComponent,
    path: 'subgrupo-contable-gestion'
  },
  // {
  //   path: ':idSubgrupoContable/asiento-contable-cabecera-modulo',
  //   loadChildren: () => import('../asiento-contable-cabecera/asiento-contable-cabecera.module')
  //     .then(m => m.AsientoContableCabeceraModule)
  // },
  {
    path: '',
    redirectTo: 'subgrupo-contable-gestion',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubgrupoContableRoutingModule {
}
