import {NgModule} from '@angular/core';
import {REVISION_IMPORTS} from './constantes/revision-imports';
import {REVISION_PROVIDERS} from './constantes/revision-providers';
import {REVISION_DECLARATIONS} from './constantes/revision-declarations';
import {BreadcrumbModule} from 'primeng/breadcrumb';

@NgModule({
  declarations: [
    ...REVISION_DECLARATIONS,
  ],
  imports: [
    ...REVISION_IMPORTS,
    BreadcrumbModule,
  ],
  providers: [
    ...REVISION_PROVIDERS,
  ]
})
export class RevisionModule {
}
