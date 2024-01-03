import {NgModule} from '@angular/core';
import {LIBRO_BIBLIOTECA_IMPORTS} from './constantes/libro-biblioteca-imports';
import {LIBRO_BIBLIOTECA_PROVIDERS} from './constantes/libro-biblioteca-providers';
import {LIBRO_BIBLIOTECA_DECLARATIONS} from './constantes/libro-biblioteca-declarations';
import {HttpArchivoModule} from '../archivo/servicios/http-archivo-module';
import { ModalArchivoLibroComponent } from './componentes/modal-archivo-libro/modal-archivo-libro.component';
import {MatDialogModule} from '@angular/material/dialog';
import {FormContainerModule} from '../../componentes/forms/form-container/form-container.module';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import {ListaValoresDetalleModule} from '../lista-valores-detalle/lista-valores-detalle.module';
import {HttpListaValoresTipoModule} from '../../servicios/lista-valores-tipo/http-lista-valores-tipo.module';

@NgModule({
  declarations: [
    ...LIBRO_BIBLIOTECA_DECLARATIONS,
    ModalArchivoLibroComponent,
  ],
  imports: [
    ...LIBRO_BIBLIOTECA_IMPORTS,
    HttpArchivoModule,
    MatDialogModule,
    FormContainerModule,
    BreadcrumbModule,
    ListaValoresDetalleModule,
    HttpListaValoresTipoModule


  ],
  providers: [
    ...LIBRO_BIBLIOTECA_PROVIDERS,
  ]
})
export class LibroBibliotecaModule {
}
