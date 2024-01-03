import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RutaRegionComponent} from './rutas/ruta-region/ruta-region.component';

const routes: Routes = [
  {
    component: RutaRegionComponent,
    path: 'region-gestion'
  },
  {
    path: '',
    redirectTo: 'region-gestion',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegionRoutingModule {
}
