import {NgModule} from '@angular/core';
import {REGION_IMPORTS} from './constantes/region-imports';
import {REGION_PROVIDERS} from './constantes/region-providers';
import {REGION_DECLARATIONS} from './constantes/region-declarations';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import {HttpListaValoresDetalleModule} from '../lista-valores-detalle/servicios/http-lista-valores-detalle-module';

@NgModule({
  declarations: [
    ...REGION_DECLARATIONS,
  ],
  imports: [
    ...REGION_IMPORTS,
    BreadcrumbModule,
    HttpListaValoresDetalleModule,
  ],
  providers: [
    ...REGION_PROVIDERS,
  ]
})
export class RegionModule {
}
