import {NgModule} from '@angular/core';
import {BANCO_IMPORTS} from './constantes/banco-imports';
import {BANCO_PROVIDERS} from './constantes/banco-providers';
import {BANCO_DECLARATIONS} from './constantes/banco-declarations';
import {BreadcrumbModule} from 'primeng/breadcrumb';

@NgModule({
  declarations: [
    ...BANCO_DECLARATIONS,
  ],
    imports: [
        ...BANCO_IMPORTS,
        BreadcrumbModule,
    ],
  providers: [
    ...BANCO_PROVIDERS,
  ]
})
export class BancoModule {
}
