import {NgModule} from '@angular/core';
import {CABECERA_COMPRA_IMPORTS} from './constantes/cabecera-compra-imports';
import {CABECERA_COMPRA_PROVIDERS} from './constantes/cabecera-compra-providers';
import {CABECERA_COMPRA_DECLARATIONS} from './constantes/cabecera-compra-declarations';
import {ModalInfoFacturaModule} from "./modales/modal-info-factura/modal-info-factura.module";
import {RutaFacturaFisicaComponent} from './rutas/factura-fisica/factura-fisica.component';
import {FacturaFisicaTablaModule} from "./componentes/factura-fisica-tabla/factura-fisica-tabla.module";
import {ModalCrearFacturaFisicaModule} from "./modales/modal-crear-factura-fisica/modal-crear-factura-fisica.module";

@NgModule({
  declarations: [
    ...CABECERA_COMPRA_DECLARATIONS,
    RutaFacturaFisicaComponent,
  ],
  imports: [
    ...CABECERA_COMPRA_IMPORTS,
    ModalInfoFacturaModule,
    FacturaFisicaTablaModule,
    ModalCrearFacturaFisicaModule
  ],
  providers: [
    ...CABECERA_COMPRA_PROVIDERS,
  ]
})
export class CabeceraCompraModule {
}
