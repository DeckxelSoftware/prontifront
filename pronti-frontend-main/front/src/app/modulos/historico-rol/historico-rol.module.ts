import {NgModule} from '@angular/core';
import {HISTORICO_ROL_IMPORTS} from './constantes/historico-rol-imports';
import {HISTORICO_ROL_PROVIDERS} from './constantes/historico-rol-providers';
import {HISTORICO_ROL_DECLARATIONS} from './constantes/historico-rol-declarations';
import { RutaInformeProvisionesComponent } from './rutas/ruta-informe-provisiones/ruta-informe-provisiones.component';
import { BreadcrumbModule } from 'primeng/breadcrumb';

@NgModule({
  declarations: [
    ...HISTORICO_ROL_DECLARATIONS,
    RutaInformeProvisionesComponent,
  ],
  imports: [
    ...HISTORICO_ROL_IMPORTS,
    BreadcrumbModule
  ],
  providers: [
    ...HISTORICO_ROL_PROVIDERS,
  ]
})
export class HistoricoRolModule {
}
