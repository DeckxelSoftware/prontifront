import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RutaRevisionComponent} from './rutas/ruta-revision/ruta-revision.component';

const routes: Routes = [
  {
    component: RutaRevisionComponent,
    path: 'revision'
  },
  {
    path: '',
    redirectTo: 'revision',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RevisionRoutingModule {
}
