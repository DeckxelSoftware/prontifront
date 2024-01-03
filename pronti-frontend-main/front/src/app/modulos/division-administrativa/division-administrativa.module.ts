import {NgModule} from '@angular/core';
import {DIVISION_ADMINISTRATIVA_IMPORTS} from './constantes/division-administrativa-imports';
import {DIVISION_ADMINISTRATIVA_PROVIDERS} from './constantes/division-administrativa-providers';
import {DIVISION_ADMINISTRATIVA_DECLARATIONS} from './constantes/division-administrativa-declarations';
import {BreadcrumbModule} from 'primeng/breadcrumb';

@NgModule({
  declarations: [
    ...DIVISION_ADMINISTRATIVA_DECLARATIONS,
  ],
  imports: [
    ...DIVISION_ADMINISTRATIVA_IMPORTS,
    BreadcrumbModule,
  ],
  providers: [
    ...DIVISION_ADMINISTRATIVA_PROVIDERS,
  ]
})
export class DivisionAdministrativaModule {
}
