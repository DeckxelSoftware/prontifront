import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RutaMemorandumComponent} from './rutas/ruta-memorandum/ruta-memorandum.component';

const routes: Routes = [
  {
    component: RutaMemorandumComponent,
    path: 'memorandum-gestion'
  },
  {
    path: '',
    redirectTo: 'memorandum-gestion',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MemorandumRoutingModule {
}
