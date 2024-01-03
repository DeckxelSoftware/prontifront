import {NgModule} from '@angular/core';
import {RECURSO_IMPORTS} from './constantes/recurso-imports';
import {RECURSO_PROVIDERS} from './constantes/recurso-providers';
import {RECURSO_DECLARATIONS} from './constantes/recurso-declarations';
import {BreadcrumbModule} from "primeng/breadcrumb";

@NgModule({
  declarations: [
    ...RECURSO_DECLARATIONS,
  ],
  imports: [
    ...RECURSO_IMPORTS,
    BreadcrumbModule,
  ],
  providers: [
    ...RECURSO_PROVIDERS,
  ]
})
export class RecursoModule {
}
