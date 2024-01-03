import {NgModule} from '@angular/core';
import {REFINANCIAMIENTO_IMPORTS} from './constantes/refinanciamiento-imports';
import {REFINANCIAMIENTO_PROVIDERS} from './constantes/refinanciamiento-providers';
import {REFINANCIAMIENTO_DECLARATIONS} from './constantes/refinanciamiento-declarations';
import {HttpItemCobroPagoModule} from "../item-cobro-pago/servicios/http-item-cobro-pago-module";
import {HttpContratoModule} from "../contrato/servicios/http-contrato-module";
import {HttpCobroModule} from "../cobro/servicios/http-cobro-module";
import {AccordionModule} from "primeng/accordion";
import {PipesModule} from "../../pipes/pipes.module";
import {InputNumberModule} from "primeng/inputnumber";
import {TableModule} from "primeng/table";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DetallePagoTablaModule} from "../cuota/componentes/detalle-pago-tabla/detalle-pago-tabla.module";
import {ButtonModule} from "primeng/button";
import {AutoCompleteModule} from "primeng/autocomplete";
import {InputTextModule} from "primeng/inputtext";

@NgModule({
  declarations: [
    ...REFINANCIAMIENTO_DECLARATIONS,
  ],
  imports: [
    ...REFINANCIAMIENTO_IMPORTS,
    HttpItemCobroPagoModule,
    HttpContratoModule,
    HttpCobroModule,
    AccordionModule,
    PipesModule,
    InputNumberModule,
    TableModule,
    FormsModule,
    DetallePagoTablaModule,
    ButtonModule,
    ReactiveFormsModule,
    AutoCompleteModule,
    InputTextModule,
  ],
  providers: [
    ...REFINANCIAMIENTO_PROVIDERS,
  ]
})
export class RefinanciamientoModule {
}
