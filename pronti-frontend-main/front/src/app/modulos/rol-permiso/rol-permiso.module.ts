import {NgModule} from '@angular/core';
import {ROL_PERMISO_IMPORTS} from './constantes/rol-permiso-imports';
import {ROL_PERMISO_PROVIDERS} from './constantes/rol-permiso-providers';
import {ROL_PERMISO_DECLARATIONS} from './constantes/rol-permiso-declarations';
import {HttpPermisoModule} from '../permiso/servicios/http-permiso-module';
import {BreadcrumbModule} from 'primeng/breadcrumb';

@NgModule({
  declarations: [
    ...ROL_PERMISO_DECLARATIONS,
  ],
    imports: [
        ...ROL_PERMISO_IMPORTS,
        HttpPermisoModule,
        BreadcrumbModule
    ],
  providers: [
    ...ROL_PERMISO_PROVIDERS,
  ]
})
export class RolPermisoModule {
}
