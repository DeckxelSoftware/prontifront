import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RutaRefinanciamientoComponent} from './rutas/ruta-refinanciamiento/ruta-refinanciamiento.component';

const routes: Routes = [
  {
    component: RutaRefinanciamientoComponent,
    path: 'refinanciamiento-gestion'
  },
  {
    path: '',
    redirectTo: 'refinanciamiento-gestion',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RefinanciamientoRoutingModule {
}
