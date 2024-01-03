import {NgModule} from '@angular/core';
import {COBRO_IMPORTS} from './constantes/cobro-imports';
import {COBRO_PROVIDERS} from './constantes/cobro-providers';
import {COBRO_DECLARATIONS} from './constantes/cobro-declarations';
import { RutaAnulacionCobroComponent } from './rutas/ruta-anulacion-cobro/ruta-anulacion-cobro.component';
import {BreadcrumbModule} from "primeng/breadcrumb";
import { RutaCuentasPorCobrarComponent } from './rutas/ruta-cuentas-por-cobrar/ruta-cuentas-por-cobrar.component';
import { TablaCuentasPorCobrarComponent } from './componentes/tabla-cuentas-por-cobrar/tabla-cuentas-por-cobrar.component';
import {PagoTablaModule} from "../cuota/componentes/pago-tabla/pago-tabla.module";
import {PipesModule} from "../../pipes/pipes.module";
import {TableModule} from "primeng/table";
import {ButtonModule} from "primeng/button";
import {TabViewModule} from "primeng/tabview";
import { FormContainerModule } from '../../componentes/forms/form-container/form-container.module';

@NgModule({
  declarations: [
    ...COBRO_DECLARATIONS,
    RutaAnulacionCobroComponent,
    RutaCuentasPorCobrarComponent,
    TablaCuentasPorCobrarComponent,
  ],
    imports: [
        ...COBRO_IMPORTS,
        BreadcrumbModule,
        PagoTablaModule,
        PipesModule,
        TableModule,
        ButtonModule,
        TabViewModule,
        FormContainerModule
    ],
  providers: [
    ...COBRO_PROVIDERS,
  ]
})
export class CobroModule {
}
