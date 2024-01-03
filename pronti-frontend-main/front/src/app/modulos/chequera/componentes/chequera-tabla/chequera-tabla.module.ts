import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChequeraTablaComponent} from './chequera-tabla.component';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';
import {ChequeraPerfilModule} from '../chequera-perfil/chequera-perfil.module';
import {FormContainerModule} from '../../../../componentes/forms/form-container/form-container.module';


@NgModule({
  declarations: [
    ChequeraTablaComponent
  ],
  exports: [
    ChequeraTablaComponent,
  ],
  imports: [
    CommonModule,
    TableModule,
    CardModule,
    ButtonModule,
    MatTabsModule,
    MatIconModule,
    MatDialogModule,
    ChequeraPerfilModule,
    FormContainerModule
  ],
})
export class ChequeraTablaModule {
}
