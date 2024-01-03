import {NgModule} from '@angular/core';
import {CARGO_IMPORTS} from './constantes/cargo-imports';
import {CARGO_PROVIDERS} from './constantes/cargo-providers';
import {CARGO_DECLARATIONS} from './constantes/cargo-declarations';
import {BreadcrumbModule} from 'primeng/breadcrumb';

@NgModule({
  declarations: [
    ...CARGO_DECLARATIONS,
  ],
  imports: [
    ...CARGO_IMPORTS,
    BreadcrumbModule,
  ],
  providers: [
    ...CARGO_PROVIDERS,
  ]
})
export class CargoModule {
}
