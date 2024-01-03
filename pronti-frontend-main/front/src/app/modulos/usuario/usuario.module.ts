import {NgModule} from '@angular/core';
import {USUARIO_IMPORTS} from './constantes/usuario-imports';
import {USUARIO_PROVIDERS} from './constantes/usuario-providers';
import {USUARIO_DECLARATIONS} from './constantes/usuario-declarations';

@NgModule({
  declarations: [
    ...USUARIO_DECLARATIONS,
  ],
  imports: [
    ...USUARIO_IMPORTS,
  ],
  providers: [
    ...USUARIO_PROVIDERS,
  ]
})
export class UsuarioModule {
}
