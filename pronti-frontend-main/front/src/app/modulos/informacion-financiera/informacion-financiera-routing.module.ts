import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RutaInformacionFinancieraComponent} from './rutas/ruta-informacion-financiera/ruta-informacion-financiera.component';

const routes: Routes = [
  {
    component: RutaInformacionFinancieraComponent,
    path: 'informacion-financiera-gestion'
  },
  {
    path: '',
    redirectTo: 'informacion-financiera-gestion',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InformacionFinancieraRoutingModule {
}
