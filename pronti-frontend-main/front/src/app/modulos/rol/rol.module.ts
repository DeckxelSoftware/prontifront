import {NgModule} from '@angular/core';
import {ROL_IMPORTS} from './constantes/rol-imports';
import {ROL_PROVIDERS} from './constantes/rol-providers';
import {ROL_DECLARATIONS} from './constantes/rol-declarations';
import {RolPermisoModule} from '../rol-permiso/rol-permiso.module';
import {BreadcrumbModule} from 'primeng/breadcrumb';

@NgModule({
  declarations: [
    ...ROL_DECLARATIONS,
  ],
    imports: [
        ...ROL_IMPORTS,
        RolPermisoModule,
        BreadcrumbModule,
    ],
  providers: [
    ...ROL_PROVIDERS,
  ]
})
export class RolModule {
}

