import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GestionInventarioMenuComponent} from './gestion-inventario-menu.component';

const routes: Routes = [
  {
    path: '',
    component: GestionInventarioMenuComponent
  },
  {
    path: 'cliente-en-grupo-modulo',
    loadChildren: () => import('../cliente-en-grupo/cliente-en-grupo.module')
      .then(m => m.ClienteEnGrupoModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionInventarioMenuRoutingModule {
}
