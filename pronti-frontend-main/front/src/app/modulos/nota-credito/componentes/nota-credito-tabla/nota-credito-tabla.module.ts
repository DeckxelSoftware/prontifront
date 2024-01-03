import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NotaCreditoTablaComponent} from './nota-credito-tabla.component';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';
import {NotaCreditoPerfilModule} from '../nota-credito-perfil/nota-credito-perfil.module';
import {FormContainerModule} from '../../../../componentes/forms/form-container/form-container.module';
import {RippleModule} from 'primeng/ripple';
import {NotaCreditoDetailModule} from '../nota-credito-detail/nota-credito-detail.module';


@NgModule({
  declarations: [
    NotaCreditoTablaComponent
  ],
  exports: [
    NotaCreditoTablaComponent,
  ],
  imports: [
    CommonModule,
    TableModule,
    CardModule,
    ButtonModule,
    MatTabsModule,
    MatIconModule,
    MatDialogModule,
    NotaCreditoPerfilModule,
    FormContainerModule,
    RippleModule,
    NotaCreditoDetailModule,
  ],
})
export class NotaCreditoTablaModule {
}
