import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RutaCuentaBancariaEmpresaComponent} from './rutas/ruta-cuenta-bancaria-empresa/ruta-cuenta-bancaria-empresa.component';

const routes: Routes = [
  {
    component: RutaCuentaBancariaEmpresaComponent,
    path: 'cuenta-bancaria-empresa'
  },
  {
    path: '',
    redirectTo: 'cuenta-bancaria-empresa',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CuentaBancariaEmpresaRoutingModule {
}
