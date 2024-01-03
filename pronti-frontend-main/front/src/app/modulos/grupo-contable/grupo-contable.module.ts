import {NgModule} from '@angular/core';
import {GRUPO_CONTABLE_IMPORTS} from './constantes/grupo-contable-imports';
import {GRUPO_CONTABLE_PROVIDERS} from './constantes/grupo-contable-providers';
import {GRUPO_CONTABLE_DECLARATIONS} from './constantes/grupo-contable-declarations';
import {BreadcrumbModule} from 'primeng/breadcrumb';

@NgModule({
  declarations: [
    ...GRUPO_CONTABLE_DECLARATIONS,
  ],
  imports: [
    ...GRUPO_CONTABLE_IMPORTS,
    BreadcrumbModule,
  ],
  providers: [
    ...GRUPO_CONTABLE_PROVIDERS,
  ]
})
export class GrupoContableModule {
}
