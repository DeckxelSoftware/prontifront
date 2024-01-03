import {NgModule} from '@angular/core';
import {AUTOR_LIBRO_IMPORTS} from './constantes/autor-libro-imports';
import {AUTOR_LIBRO_PROVIDERS} from './constantes/autor-libro-providers';
import {AUTOR_LIBRO_DECLARATIONS} from './constantes/autor-libro-declarations';
import {ArchivoModule} from '../archivo/archivo.module';
import {BreadcrumbModule} from 'primeng/breadcrumb';
@NgModule({
  declarations: [
    ...AUTOR_LIBRO_DECLARATIONS,
  ],
  imports: [
    ...AUTOR_LIBRO_IMPORTS,
    ArchivoModule,
    BreadcrumbModule
  ],
  providers: [
    ...AUTOR_LIBRO_PROVIDERS,
  ]
})
export class AutorLibroModule {
}
