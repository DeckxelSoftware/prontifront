import {NgModule} from '@angular/core';
import {ARCHIVO_IMPORTS} from './constantes/archivo-imports';
import {ARCHIVO_PROVIDERS} from './constantes/archivo-providers';
import {ARCHIVO_DECLARATIONS} from './constantes/archivo-declarations';

@NgModule({
  declarations: [
    ...ARCHIVO_DECLARATIONS,
  ],
  imports: [
    ...ARCHIVO_IMPORTS,
  ],
  providers: [
    ...ARCHIVO_PROVIDERS,
  ]
})
export class ArchivoModule {
}
