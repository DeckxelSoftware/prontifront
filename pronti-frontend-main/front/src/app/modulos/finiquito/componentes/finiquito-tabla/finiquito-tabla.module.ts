import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FiniquitoTablaComponent} from './finiquito-tabla.component';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';
import {FiniquitoPerfilModule} from '../finiquito-perfil/finiquito-perfil.module';
import {FormContainerModule} from "../../../../componentes/forms/form-container/form-container.module";


@NgModule({
  declarations: [
    FiniquitoTablaComponent
  ],
  exports: [
    FiniquitoTablaComponent,
  ],
  imports: [
    CommonModule,
    TableModule,
    CardModule,
    ButtonModule,
    MatTabsModule,
    MatIconModule,
    MatDialogModule,
    FiniquitoPerfilModule,
    FormContainerModule
  ],
})
export class FiniquitoTablaModule {
}
