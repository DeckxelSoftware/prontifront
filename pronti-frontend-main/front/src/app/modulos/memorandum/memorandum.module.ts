import {NgModule} from '@angular/core';
import {MEMORANDUM_IMPORTS} from './constantes/memorandum-imports';
import {MEMORANDUM_PROVIDERS} from './constantes/memorandum-providers';
import {MEMORANDUM_DECLARATIONS} from './constantes/memorandum-declarations';
import {BreadcrumbModule} from 'primeng/breadcrumb';

@NgModule({
  declarations: [
    ...MEMORANDUM_DECLARATIONS,
  ],
  imports: [
    ...MEMORANDUM_IMPORTS,
    BreadcrumbModule,
  ],
  providers: [
    ...MEMORANDUM_PROVIDERS,
  ]
})
export class MemorandumModule {
}
