import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RutaEmpresaComponent} from './rutas/ruta-empresa/ruta-empresa.component';

const routes: Routes = [
  {
    component: RutaEmpresaComponent,
    path: 'empresa'
  },
  {
    path: '',
    redirectTo: 'empresa',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpresaRoutingModule {
}
