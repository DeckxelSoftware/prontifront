import {NgModule} from '@angular/core';
import {SUBGRUPO_CONTABLE_IMPORTS} from './constantes/subgrupo-contable-imports';
import {SUBGRUPO_CONTABLE_PROVIDERS} from './constantes/subgrupo-contable-providers';
import {SUBGRUPO_CONTABLE_DECLARATIONS} from './constantes/subgrupo-contable-declarations';
import {BreadcrumbModule} from 'primeng/breadcrumb';

@NgModule({
  declarations: [
    ...SUBGRUPO_CONTABLE_DECLARATIONS,
  ],
    imports: [
        ...SUBGRUPO_CONTABLE_IMPORTS,
        BreadcrumbModule,
    ],
  providers: [
    ...SUBGRUPO_CONTABLE_PROVIDERS,
  ]
})
export class SubgrupoContableModule {
}
