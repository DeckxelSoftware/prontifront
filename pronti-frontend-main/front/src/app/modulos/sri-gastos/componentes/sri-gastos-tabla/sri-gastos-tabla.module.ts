import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SriGastosTablaComponent} from './sri-gastos-tabla.component';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';
import {SriGastosPerfilModule} from '../sri-gastos-perfil/sri-gastos-perfil.module';
import {FormContainerModule} from "../../../../componentes/forms/form-container/form-container.module";


@NgModule({
  declarations: [
    SriGastosTablaComponent
  ],
  exports: [
    SriGastosTablaComponent,
  ],
  imports: [
    CommonModule,
    TableModule,
    CardModule,
    ButtonModule,
    MatTabsModule,
    MatIconModule,
    MatDialogModule,
    SriGastosPerfilModule,
    FormContainerModule
  ],
})
export class SriGastosTablaModule {
}
