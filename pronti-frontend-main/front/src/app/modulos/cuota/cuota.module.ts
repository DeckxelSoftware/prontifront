import {NgModule} from '@angular/core';
import {CUOTA_IMPORTS} from './constantes/cuota-imports';
import {CUOTA_PROVIDERS} from './constantes/cuota-providers';
import {CUOTA_DECLARATIONS} from './constantes/cuota-declarations';
import {RutaCuotaCobroComponent} from './rutas/ruta-cuota-cobro/ruta-cuota-cobro.component';
import {AccordionModule} from "primeng/accordion";
import {PipesModule} from "../../pipes/pipes.module";
import {TableModule} from "primeng/table";
import {InputNumberModule} from "primeng/inputnumber";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FormlyModule} from "@ngx-formly/core";
import {AutoCompleteModule} from "primeng/autocomplete";
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {DetallePagoTablaModule} from "./componentes/detalle-pago-tabla/detalle-pago-tabla.module";
import {BreadcrumbModule} from "primeng/breadcrumb";
import {HttpItemCobroPagoModule} from "../item-cobro-pago/servicios/http-item-cobro-pago-module";
import {HttpCobroModule} from "../cobro/servicios/http-cobro-module";

@NgModule({
  declarations: [
    ...CUOTA_DECLARATIONS,
    RutaCuotaCobroComponent,
  ],
  imports: [
    ...CUOTA_IMPORTS,
    AccordionModule,
    PipesModule,
    TableModule,
    InputNumberModule,
    FormsModule,
    FormlyModule,
    ReactiveFormsModule,
    AutoCompleteModule,
    InputTextModule,
    ButtonModule,
    DetallePagoTablaModule,
    BreadcrumbModule,
    HttpItemCobroPagoModule,
    HttpCobroModule,
  ],
  providers: [
    ...CUOTA_PROVIDERS,
  ]
})
export class CuotaModule {
}
