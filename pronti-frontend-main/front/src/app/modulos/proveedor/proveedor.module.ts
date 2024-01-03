import {NgModule} from '@angular/core';
import {PROVEEDOR_IMPORTS} from './constantes/proveedor-imports';
import {PROVEEDOR_PROVIDERS} from './constantes/proveedor-providers';
import {PROVEEDOR_DECLARATIONS} from './constantes/proveedor-declarations';
import {RouteHeaderModule} from '../../componentes/routes/route-header/route-header.module';
import {ModalCrearProveedorModule} from './componentes/modal-crear-proveedor/modal-crear-proveedor.module';
import {ModalInicialCrearProveedorModule} from './componentes/modal-inicial-crear-proveedor/modal-inicial-crear-proveedor.module';
import {HttpListaValoresDetalleModule} from '../lista-valores-detalle/servicios/http-lista-valores-detalle-module';

@NgModule({
  declarations: [
    ...PROVEEDOR_DECLARATIONS,
  ],
  imports: [
    ...PROVEEDOR_IMPORTS,
    RouteHeaderModule,
    ModalCrearProveedorModule,
    ModalInicialCrearProveedorModule,
    HttpListaValoresDetalleModule
  ],
  providers: [
    ...PROVEEDOR_PROVIDERS,
  ]
})
export class ProveedorModule {
}
