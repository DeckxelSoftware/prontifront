import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RutaLicitacionComponent} from './rutas/ruta-licitacion/ruta-licitacion.component';
import { RutaLicitacionPreasambleaComponent } from './rutas/ruta-licitacion-preasamblea/ruta-licitacion-preasamblea.component';
import { RutaAprobacionPreasambleaComponent } from './rutas/ruta-aprobacion-preasamblea/ruta-aprobacion-preasamblea.component';

const routes: Routes = [
  {
    component: RutaLicitacionComponent,
    path: 'licitacion-gestion'
  },
  {
    component: RutaLicitacionPreasambleaComponent,
    path: 'gestion-preasamblea',
    children: [
      
    ]
  },
  {
    component: RutaAprobacionPreasambleaComponent,
    path: 'gestion-preasamblea/:id/aprobacion'
  },
  {
    path: '',
    redirectTo: 'licitacion-gestion',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LicitacionRoutingModule {
}
