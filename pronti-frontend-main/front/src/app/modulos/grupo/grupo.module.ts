import {NgModule} from '@angular/core';
import {GRUPO_IMPORTS} from './constantes/grupo-imports';
import {GRUPO_PROVIDERS} from './constantes/grupo-providers';
import {GRUPO_DECLARATIONS} from './constantes/grupo-declarations';
import {BreadcrumbModule} from 'primeng/breadcrumb';

@NgModule({
  declarations: [
    ...GRUPO_DECLARATIONS,
  ],
  imports: [
    ...GRUPO_IMPORTS,
    BreadcrumbModule,
  ],
  providers: [
    ...GRUPO_PROVIDERS,
  ]
})
export class GrupoModule {
}
