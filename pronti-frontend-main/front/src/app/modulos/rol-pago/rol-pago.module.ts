import {NgModule} from '@angular/core';
import {ROL_PAGO_IMPORTS} from './constantes/rol-pago-imports';
import {ROL_PAGO_PROVIDERS} from './constantes/rol-pago-providers';
import {ROL_PAGO_DECLARATIONS} from './constantes/rol-pago-declarations';
import {BreadcrumbModule} from "primeng/breadcrumb";
import { RutaRolPagoIndividualComponent } from './rutas/ruta-rol-pago-individual/ruta-rol-pago-individual.component';
import { RutaCalcularRolComponent } from './rutas/ruta-calcular-rol/ruta-calcular-rol.component';
import {HttpPeriodoLaboralModule} from '../periodo-laboral/servicios/http-periodo-laboral-module';
import {PipesModule} from '../../pipes/pipes.module';
import { RutaRolPagoConHistoricoComponent } from './rutas/ruta-rol-pago-con-historico/ruta-rol-pago-con-historico.component';
import { HttpConfiguracionGeneralModule } from '../configuracion-general/servicios/http-configuracion-general-module';

@NgModule({
  declarations: [
    ...ROL_PAGO_DECLARATIONS,
    RutaRolPagoIndividualComponent,
    RutaCalcularRolComponent,
    RutaRolPagoConHistoricoComponent,
  ],
    imports: [
        ...ROL_PAGO_IMPORTS,
        BreadcrumbModule,
        HttpPeriodoLaboralModule,
        PipesModule,
        HttpConfiguracionGeneralModule,
    ],
  providers: [
    ...ROL_PAGO_PROVIDERS,
  ]
})
export class RolPagoModule {
}
