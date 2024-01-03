import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RutaRolPagoComponent} from './rutas/ruta-rol-pago/ruta-rol-pago.component';
import {RutaRolPagoIndividualComponent} from './rutas/ruta-rol-pago-individual/ruta-rol-pago-individual.component';
import {RutaCalcularRolComponent} from './rutas/ruta-calcular-rol/ruta-calcular-rol.component';
import { RutaRolPagoConHistoricoComponent } from './rutas/ruta-rol-pago-con-historico/ruta-rol-pago-con-historico.component';

const routes: Routes = [
  {
    component: RutaRolPagoComponent,
    path: 'rol-pago-gestion'
  },
  {
    component: RutaRolPagoIndividualComponent,
    path: 'rol-pago-individual'
  },
  {
    component: RutaCalcularRolComponent,
    path: 'calcular-rol'
  },
  {
    component: RutaRolPagoConHistoricoComponent,
    path: 'rol-historico'
  },
  {
    path: '',
    redirectTo: 'rol-pago-gestion',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RolPagoRoutingModule {
}
