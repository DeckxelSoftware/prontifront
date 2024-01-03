import {NgModule} from '@angular/core';
import {ORDEN_DE_COMPRA_IMPORTS} from './constantes/orden-de-compra-imports';
import {ORDEN_DE_COMPRA_PROVIDERS} from './constantes/orden-de-compra-providers';
import {ORDEN_DE_COMPRA_DECLARATIONS} from './constantes/orden-de-compra-declarations';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import {HttpContratoModule} from '../contrato/servicios/http-contrato-module';
import {HttpListaValoresDetalleModule} from '../lista-valores-detalle/servicios/http-lista-valores-detalle-module';
import { HttpProveedorModule } from '../proveedor/servicios/http-proveedor-module';
import { HttpEmpresaModule } from '../empresa/servicios/http-empresa-module';

@NgModule({
  declarations: [
    ...ORDEN_DE_COMPRA_DECLARATIONS,
  ],
  imports: [
    ...ORDEN_DE_COMPRA_IMPORTS,
    BreadcrumbModule,
    HttpContratoModule,
    HttpListaValoresDetalleModule,
    HttpEmpresaModule,
    HttpProveedorModule
  ],
  providers: [
    ...ORDEN_DE_COMPRA_PROVIDERS,
  ]
})
export class OrdenDeCompraModule {
}
