import {NgModule} from '@angular/core';
import {CUENTA_BANCARIA_EMPRESA_IMPORTS} from './constantes/cuenta-bancaria-empresa-imports';
import {CUENTA_BANCARIA_EMPRESA_PROVIDERS} from './constantes/cuenta-bancaria-empresa-providers';
import {CUENTA_BANCARIA_EMPRESA_DECLARATIONS} from './constantes/cuenta-bancaria-empresa-declarations';
import {BreadcrumbModule} from 'primeng/breadcrumb';

@NgModule({
  declarations: [
    ...CUENTA_BANCARIA_EMPRESA_DECLARATIONS,
  ],
  imports: [
    ...CUENTA_BANCARIA_EMPRESA_IMPORTS,
    BreadcrumbModule,
  ],
  providers: [
    ...CUENTA_BANCARIA_EMPRESA_PROVIDERS,
  ]
})
export class CuentaBancariaEmpresaModule {
}
