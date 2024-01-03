import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LibroBibliotecaTablaComponent} from './libro-biblioteca-tabla.component';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';
import {LibroBibliotecaPerfilModule} from '../libro-biblioteca-perfil/libro-biblioteca-perfil.module';
import {FormContainerModule} from '../../../../componentes/forms/form-container/form-container.module';
import {RippleModule} from 'primeng/ripple';
import {ListaValoresDetalleModule} from '../../../lista-valores-detalle/lista-valores-detalle.module';


@NgModule({
  declarations: [
    LibroBibliotecaTablaComponent
  ],
  exports: [
    LibroBibliotecaTablaComponent,
  ],
  imports: [
    CommonModule,
    TableModule,
    CardModule,
    ButtonModule,
    MatTabsModule,
    MatIconModule,
    MatDialogModule,
    LibroBibliotecaPerfilModule,
    FormContainerModule,
    RippleModule,
    ListaValoresDetalleModule,
  ],
})
export class LibroBibliotecaTablaModule {
}
