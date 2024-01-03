import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RutaArticuloComponent} from './rutas/ruta-articulo/ruta-articulo.component';

const routes: Routes = [
  {
    component: RutaArticuloComponent,
    path: 'articulo'
  },
  {
    path: ':idArticulo/revision-modulo',
    loadChildren: () => import('../revision/revision.module')
      .then(m => m.RevisionModule)
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'articulo'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticuloRoutingModule {
}
