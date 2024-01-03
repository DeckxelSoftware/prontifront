import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RutaConfiguracionGeneralComponent} from './rutas/ruta-configuracion-general/ruta-configuracion-general.component';

const routes: Routes = [
  {
    path: 'configuracion-general',
    component: RutaConfiguracionGeneralComponent,
  },
  {
    path: '',
    redirectTo: 'configuracion-general',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfiguracionGeneralRoutingModule {
}
