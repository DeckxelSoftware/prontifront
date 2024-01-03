import {NgModule} from '@angular/core';
import {ABONO_PRESTAMO_IMPORTS} from './constantes/abono-prestamo-imports';
import {ABONO_PRESTAMO_PROVIDERS} from './constantes/abono-prestamo-providers';
import {ABONO_PRESTAMO_DECLARATIONS} from './constantes/abono-prestamo-declarations';
import {BreadcrumbModule} from 'primeng/breadcrumb';

@NgModule({
  declarations: [
    ...ABONO_PRESTAMO_DECLARATIONS,
  ],
  imports: [
    ...ABONO_PRESTAMO_IMPORTS,
    BreadcrumbModule,
  ],
  providers: [
    ...ABONO_PRESTAMO_PROVIDERS,
  ]
})
export class AbonoPrestamoModule {
}
