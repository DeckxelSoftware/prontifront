import {NgModule} from '@angular/core';
import {CARGO_VACACION_IMPORTS} from './constantes/cargo-vacacion-imports';
import {CARGO_VACACION_PROVIDERS} from './constantes/cargo-vacacion-providers';
import {CARGO_VACACION_DECLARATIONS} from './constantes/cargo-vacacion-declarations';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import {HttpRegistroVacacionModule} from '../registro-vacacion/servicios/http-registro-vacacion-module';
import {HttpConfiguracionGeneralModule} from '../configuracion-general/servicios/http-configuracion-general-module';
import {HttpTrabajadorModule} from '../trabajador/servicios/http-trabajador-module';
import { RutaInformeVacacionesComponent } from './rutas/ruta-informe-vacaciones/ruta-informe-vacaciones.component';

@NgModule({
  declarations: [
    ...CARGO_VACACION_DECLARATIONS,
    RutaInformeVacacionesComponent,
  ],
  imports: [
    ...CARGO_VACACION_IMPORTS,
    BreadcrumbModule,
    HttpRegistroVacacionModule,
    HttpConfiguracionGeneralModule,
    HttpTrabajadorModule,
  ],
  providers: [
    ...CARGO_VACACION_PROVIDERS,
  ]
})
export class CargoVacacionModule {
}
