import {NgModule} from '@angular/core';
import {LICITACION_IMPORTS} from './constantes/licitacion-imports';
import {LICITACION_PROVIDERS} from './constantes/licitacion-providers';
import {LICITACION_DECLARATIONS} from './constantes/licitacion-declarations';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import {ModalLicitacionModule} from './modales/modal-licitacion/modal-licitacion.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';

@NgModule({
  declarations: [
    ...LICITACION_DECLARATIONS,
  ],
  imports: [
    ...LICITACION_IMPORTS,
    BreadcrumbModule,
    ModalLicitacionModule,
    FormsModule,
    ReactiveFormsModule,
    FormlyModule,
    FormlyBootstrapModule,
  ],
  providers: [
    ...LICITACION_PROVIDERS,
  ]
})
export class LicitacionModule {
}
