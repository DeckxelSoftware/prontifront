import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RutaPreasambleaComponent} from './rutas/ruta-preasamblea/ruta-preasamblea.component';

const routes: Routes = [
  {
    component: RutaPreasambleaComponent,
    path: 'preasamblea'
  },
  {
    path: '',
    redirectTo: 'preasamblea',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PreasambleaRoutingModule {
}
