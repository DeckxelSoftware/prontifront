import {NgModule} from '@angular/core';
import {PRECIO_IMPORTS} from './constantes/precio-imports';
import {PRECIO_PROVIDERS} from './constantes/precio-providers';
import {PRECIO_DECLARATIONS} from './constantes/precio-declarations';

@NgModule({
  declarations: [
    ...PRECIO_DECLARATIONS,
  ],
  imports: [
    ...PRECIO_IMPORTS,
  ],
  providers: [
    ...PRECIO_PROVIDERS,
  ]
})
export class PrecioModule {
}
