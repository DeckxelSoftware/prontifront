import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RutaCargoComponent} from './rutas/ruta-cargo/ruta-cargo.component';

const routes: Routes = [
  {
    component: RutaCargoComponent,
    path: 'cargo-gestion'
  },
  {
    path: '',
    redirectTo: 'cargo-gestion',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CargoRoutingModule {
}
