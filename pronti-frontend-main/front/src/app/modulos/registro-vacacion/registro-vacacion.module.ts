import {NgModule} from '@angular/core';
import {REGISTRO_VACACION_IMPORTS} from './constantes/registro-vacacion-imports';
import {REGISTRO_VACACION_PROVIDERS} from './constantes/registro-vacacion-providers';
import {REGISTRO_VACACION_DECLARATIONS} from './constantes/registro-vacacion-declarations';
import {BreadcrumbModule} from 'primeng/breadcrumb';

@NgModule({
  declarations: [
    ...REGISTRO_VACACION_DECLARATIONS,
  ],
    imports: [
        ...REGISTRO_VACACION_IMPORTS,
        BreadcrumbModule,
    ],
  providers: [
    ...REGISTRO_VACACION_PROVIDERS,
  ]
})
export class RegistroVacacionModule {
}
