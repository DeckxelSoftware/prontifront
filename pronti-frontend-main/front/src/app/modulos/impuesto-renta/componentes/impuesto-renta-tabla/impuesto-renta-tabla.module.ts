import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ImpuestoRentaTablaComponent} from './impuesto-renta-tabla.component';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';
import {ImpuestoRentaPerfilModule} from '../impuesto-renta-perfil/impuesto-renta-perfil.module';
import {FormContainerModule} from '../../../../componentes/forms/form-container/form-container.module';


@NgModule({
  declarations: [
    ImpuestoRentaTablaComponent
  ],
  exports: [
    ImpuestoRentaTablaComponent,
  ],
  imports: [
    CommonModule,
    TableModule,
    CardModule,
    ButtonModule,
    MatTabsModule,
    MatIconModule,
    MatDialogModule,
    ImpuestoRentaPerfilModule,
    FormContainerModule
  ],
})
export class ImpuestoRentaTablaModule {
}
