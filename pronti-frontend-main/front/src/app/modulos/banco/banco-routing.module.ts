import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RutaBancoComponent} from './rutas/ruta-banco/ruta-banco.component';

const routes: Routes = [
  {
    component: RutaBancoComponent,
    path: 'banco'
  },
  {
    path: '',
    redirectTo: 'banco',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BancoRoutingModule {
}
