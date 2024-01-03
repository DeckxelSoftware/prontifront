import {NgModule} from '@angular/core';
import {EMPRESA_IMPORTS} from './constantes/empresa-imports';
import {EMPRESA_PROVIDERS} from './constantes/empresa-providers';
import {EMPRESA_DECLARATIONS} from './constantes/empresa-declarations';
import {HttpListaValoresTipoModule} from '../../servicios/lista-valores-tipo/http-lista-valores-tipo.module';
import {BreadcrumbModule} from 'primeng/breadcrumb';

@NgModule({
  declarations: [
    ...EMPRESA_DECLARATIONS,
  ],
    imports: [
        ...EMPRESA_IMPORTS,
        HttpListaValoresTipoModule,
        BreadcrumbModule,
    ],
  providers: [
    ...EMPRESA_PROVIDERS,
  ]
})
export class EmpresaModule {
}
