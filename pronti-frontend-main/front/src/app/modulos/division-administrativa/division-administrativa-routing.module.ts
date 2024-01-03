import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RutaDivisionAdministrativaComponent} from './rutas/ruta-division-administrativa/ruta-division-administrativa.component';

const routes: Routes = [
  {
    component: RutaDivisionAdministrativaComponent,
    path: 'division-administrativa'
  },
  {
    path: '',
    redirectTo: 'division-administrativa',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DivisionAdministrativaRoutingModule {
}
