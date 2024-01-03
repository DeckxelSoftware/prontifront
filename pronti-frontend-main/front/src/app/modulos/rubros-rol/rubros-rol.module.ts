import {NgModule} from '@angular/core';
import {RUBROS_ROL_IMPORTS} from './constantes/rubros-rol-imports';
import {RUBROS_ROL_PROVIDERS} from './constantes/rubros-rol-providers';
import {RUBROS_ROL_DECLARATIONS} from './constantes/rubros-rol-declarations';
import {BreadcrumbModule} from 'primeng/breadcrumb';

@NgModule({
  declarations: [
    ...RUBROS_ROL_DECLARATIONS,
  ],
  imports: [
    ...RUBROS_ROL_IMPORTS,
    BreadcrumbModule,
  ],
  providers: [
    ...RUBROS_ROL_PROVIDERS,
  ]
})
export class RubrosRolModule {
}
