import {NgModule} from '@angular/core';
import {PREASAMBLEA_IMPORTS} from './constantes/preasamblea-imports';
import {PREASAMBLEA_PROVIDERS} from './constantes/preasamblea-providers';
import {PREASAMBLEA_DECLARATIONS} from './constantes/preasamblea-declarations';
import {BreadcrumbModule} from "primeng/breadcrumb";

@NgModule({
  declarations: [
    ...PREASAMBLEA_DECLARATIONS,
  ],
  imports: [
    ...PREASAMBLEA_IMPORTS,
    BreadcrumbModule,
  ],
  providers: [
    ...PREASAMBLEA_PROVIDERS,
  ]
})
export class PreasambleaModule {
}
