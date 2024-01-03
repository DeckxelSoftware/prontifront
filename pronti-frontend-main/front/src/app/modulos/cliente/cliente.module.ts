import {NgModule} from '@angular/core';
import {CLIENTE_IMPORTS} from './constantes/cliente-imports';
import {CLIENTE_PROVIDERS} from './constantes/cliente-providers';
import {CLIENTE_DECLARATIONS} from './constantes/cliente-declarations';
import {BreadcrumbModule} from 'primeng/breadcrumb';

@NgModule({
  declarations: [
    ...CLIENTE_DECLARATIONS,
  ],
  imports: [
    ...CLIENTE_IMPORTS,
    BreadcrumbModule,
  ],
  providers: [
    ...CLIENTE_PROVIDERS,
  ]
})
export class ClienteModule {
}
