import {NgModule} from '@angular/core';
import {SUPERVISOR_IMPORTS} from './constantes/supervisor-imports';
import {SUPERVISOR_PROVIDERS} from './constantes/supervisor-providers';
import {SUPERVISOR_DECLARATIONS} from './constantes/supervisor-declarations';
import { BreadcrumbModule } from 'primeng/breadcrumb';

@NgModule({
  declarations: [
    ...SUPERVISOR_DECLARATIONS,
  ],
  imports: [
    ...SUPERVISOR_IMPORTS,
    BreadcrumbModule
  ],
  providers: [
    ...SUPERVISOR_PROVIDERS,
  ]
})
export class SupervisorModule {
}
