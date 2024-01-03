import {NgModule} from '@angular/core';
import {ITEM_COBRO_PAGO_IMPORTS} from './constantes/item-cobro-pago-imports';
import {ITEM_COBRO_PAGO_PROVIDERS} from './constantes/item-cobro-pago-providers';
import {ITEM_COBRO_PAGO_DECLARATIONS} from './constantes/item-cobro-pago-declarations';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import {HttpCuentaContableModule} from '../cuenta-contable/servicios/http-cuenta-contable-module';

@NgModule({
  declarations: [
    ...ITEM_COBRO_PAGO_DECLARATIONS,
  ],
  imports: [
    ...ITEM_COBRO_PAGO_IMPORTS,
    BreadcrumbModule,
    HttpCuentaContableModule
  ],
  providers: [
    ...ITEM_COBRO_PAGO_PROVIDERS,
  ]
})
export class ItemCobroPagoModule {
}
