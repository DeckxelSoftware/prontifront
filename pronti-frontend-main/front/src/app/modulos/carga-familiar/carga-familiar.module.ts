import {NgModule} from '@angular/core';
import {CARGA_FAMILIAR_IMPORTS} from './constantes/carga-familiar-imports';
import {CARGA_FAMILIAR_PROVIDERS} from './constantes/carga-familiar-providers';
import {CARGA_FAMILIAR_DECLARATIONS} from './constantes/carga-familiar-declarations';
import {BreadcrumbModule} from 'primeng/breadcrumb';

@NgModule({
  declarations: [
    ...CARGA_FAMILIAR_DECLARATIONS,
  ],
    imports: [
        ...CARGA_FAMILIAR_IMPORTS,
        BreadcrumbModule,
    ],
  providers: [
    ...CARGA_FAMILIAR_PROVIDERS,
  ]
})
export class CargaFamiliarModule {
}
