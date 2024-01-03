import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RutaAreaComponent} from './rutas/ruta-area/ruta-area.component';

const routes: Routes = [
  {
    component: RutaAreaComponent,
    path: 'area-gestion'
  },
  {
    path: '',
    redirectTo: 'area-gestion',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AreaRoutingModule {
}
