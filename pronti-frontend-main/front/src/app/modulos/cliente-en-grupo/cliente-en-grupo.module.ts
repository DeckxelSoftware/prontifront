import {NgModule} from '@angular/core';
import {CLIENTE_EN_GRUPO_IMPORTS} from './constantes/cliente-en-grupo-imports';
import {CLIENTE_EN_GRUPO_PROVIDERS} from './constantes/cliente-en-grupo-providers';
import {CLIENTE_EN_GRUPO_DECLARATIONS} from './constantes/cliente-en-grupo-declarations';
import {BreadcrumbModule} from 'primeng/breadcrumb';

@NgModule({
  declarations: [
    ...CLIENTE_EN_GRUPO_DECLARATIONS,
  ],
    imports: [
        ...CLIENTE_EN_GRUPO_IMPORTS,
        BreadcrumbModule,
    ],
  providers: [
    ...CLIENTE_EN_GRUPO_PROVIDERS,
  ]
})
export class ClienteEnGrupoModule {
}
