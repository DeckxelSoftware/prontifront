import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RutaCargaFamiliarComponent} from './rutas/ruta-carga-familiar/ruta-carga-familiar.component';

const routes: Routes = [
  {
    component: RutaCargaFamiliarComponent,
    path: 'carga-familiar-gestion'
  },
  {
    path: '',
    redirectTo: 'carga-familiar-gestion',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CargaFamiliarRoutingModule {
}
