import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ListaValoresDetalleTablaComponent} from './lista-valores-detalle-tabla.component';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';
import {ListaValoresDetallePerfilModule} from '../lista-valores-detalle-perfil/lista-valores-detalle-perfil.module';
import {FormContainerModule} from '../../../../componentes/forms/form-container/form-container.module';


@NgModule({
  declarations: [
    ListaValoresDetalleTablaComponent
  ],
  exports: [
    ListaValoresDetalleTablaComponent,
  ],
  imports: [
    CommonModule,
    TableModule,
    CardModule,
    ButtonModule,
    MatTabsModule,
    MatIconModule,
    MatDialogModule,
    ListaValoresDetallePerfilModule,
    FormContainerModule
  ],
})
export class ListaValoresDetalleTablaModule {
}
