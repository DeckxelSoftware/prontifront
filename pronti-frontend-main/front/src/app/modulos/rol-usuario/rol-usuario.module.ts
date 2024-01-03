import {NgModule} from '@angular/core';
import {ROL_USUARIO_IMPORTS} from './constantes/rol-usuario-imports';
import {ROL_USUARIO_PROVIDERS} from './constantes/rol-usuario-providers';
import {ROL_USUARIO_DECLARATIONS} from './constantes/rol-usuario-declarations';

@NgModule({
  declarations: [
    ...ROL_USUARIO_DECLARATIONS,
  ],
  imports: [
    ...ROL_USUARIO_IMPORTS,
  ],
  providers: [
    ...ROL_USUARIO_PROVIDERS,
  ]
})
export class RolUsuarioModule {
}
