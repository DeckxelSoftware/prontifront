import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Pagos1TablaComponent} from './pagos1-tabla.component';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';
import {Pagos1PerfilModule} from '../pagos1-perfil/pagos1-perfil.module';
import {FormContainerModule} from "../../../../componentes/forms/form-container/form-container.module";


@NgModule({
  declarations: [
    Pagos1TablaComponent
  ],
  exports: [
    Pagos1TablaComponent,
  ],
  imports: [
    CommonModule,
    TableModule,
    CardModule,
    ButtonModule,
    MatTabsModule,
    MatIconModule,
    MatDialogModule,
    Pagos1PerfilModule,
    FormContainerModule
  ],
})
export class Pagos1TablaModule {
}
