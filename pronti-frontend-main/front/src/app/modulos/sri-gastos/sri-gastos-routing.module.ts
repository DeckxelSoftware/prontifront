import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RutaSriGastosComponent} from './rutas/ruta-sri-gastos/ruta-sri-gastos.component';

const routes: Routes = [
  {
    component: RutaSriGastosComponent,
    path: 'sri-gastos-gestion'
  },
  {
    path: '',
    redirectTo: 'sri-gastos-gestion',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SriGastosRoutingModule {
}
