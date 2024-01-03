import {NgModule} from '@angular/core';
import {LISTA_VALORES_DETALLE_IMPORTS} from './constantes/lista-valores-detalle-imports';
import {LISTA_VALORES_DETALLE_PROVIDERS} from './constantes/lista-valores-detalle-providers';
import {LISTA_VALORES_DETALLE_DECLARATIONS} from './constantes/lista-valores-detalle-declarations';

@NgModule({
  declarations: [
    ...LISTA_VALORES_DETALLE_DECLARATIONS,
  ],
  imports: [
    ...LISTA_VALORES_DETALLE_IMPORTS,
  ],
  providers: [
    ...LISTA_VALORES_DETALLE_PROVIDERS,
  ]
})
export class ListaValoresDetalleModule {
}
