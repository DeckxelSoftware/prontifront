import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RutaCuotaComponent} from './rutas/ruta-cuota/ruta-cuota.component';
import {RutaCuotaCobroComponent} from "./rutas/ruta-cuota-cobro/ruta-cuota-cobro.component";

const routes: Routes = [
  {
    component: RutaCuotaComponent,
    path: 'cuota'
  },
  {
    component: RutaCuotaCobroComponent,
    path: 'cuota-cobro'
  },
  {
    component: RutaCuotaCobroComponent,
    path: 'adelanto-cuota'
  },
  {
    path: '',
    redirectTo: 'cuota',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CuotaRoutingModule {
}
