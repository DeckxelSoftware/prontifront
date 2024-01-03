import {NgModule} from '@angular/core';
import {AREA_IMPORTS} from './constantes/area-imports';
import {AREA_PROVIDERS} from './constantes/area-providers';
import {AREA_DECLARATIONS} from './constantes/area-declarations';
import {BreadcrumbModule} from 'primeng/breadcrumb';

@NgModule({
  declarations: [
    ...AREA_DECLARATIONS,
  ],
  imports: [
    ...AREA_IMPORTS,
    BreadcrumbModule,
  ],
  providers: [
    ...AREA_PROVIDERS,
  ]
})
export class AreaModule {
}
