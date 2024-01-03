import {NgModule} from '@angular/core';
import {PERFIL_USUARIO_IMPORTS} from './constantes/perfil-usuario-imports';
import {PERFIL_USUARIO_PROVIDERS} from './constantes/perfil-usuario-providers';
import {PERFIL_USUARIO_DECLARATIONS} from './constantes/perfil-usuario-declarations';

@NgModule({
  declarations: [
    ...PERFIL_USUARIO_DECLARATIONS,
  ],
  imports: [
    ...PERFIL_USUARIO_IMPORTS,
  ],
  providers: [
    ...PERFIL_USUARIO_PROVIDERS,
  ]
})
export class PerfilUsuarioModule {
}
