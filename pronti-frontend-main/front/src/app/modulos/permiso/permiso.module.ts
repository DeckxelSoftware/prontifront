import {NgModule} from '@angular/core';
import {PERMISO_IMPORTS} from './constantes/permiso-imports';
import {PERMISO_PROVIDERS} from './constantes/permiso-providers';
import {PERMISO_DECLARATIONS} from './constantes/permiso-declarations';

@NgModule({
  declarations: [
    ...PERMISO_DECLARATIONS,
  ],
  imports: [
    ...PERMISO_IMPORTS,
  ],
  providers: [
    ...PERMISO_PROVIDERS,
  ]
})
export class PermisoModule {
}
