import {NgModule} from '@angular/core';
import {ARTICULO_IMPORTS} from './constantes/articulo-imports';
import {ARTICULO_PROVIDERS} from './constantes/articulo-providers';
import {ARTICULO_DECLARATIONS} from './constantes/articulo-declarations';
import {RutaArticuloComponent} from "./rutas/ruta-articulo/ruta-articulo.component";
import {BreadcrumbModule} from 'primeng/breadcrumb';

@NgModule({
  declarations: [
    ...ARTICULO_DECLARATIONS,
  ],
    imports: [
        ...ARTICULO_IMPORTS,
        BreadcrumbModule,
    ],
  providers: [
    ...ARTICULO_PROVIDERS,
  ],
  exports: [RutaArticuloComponent]
})
export class ArticuloModule {
}
