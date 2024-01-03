import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ItemCobroPagoTablaComponent} from './item-cobro-pago-tabla.component';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';
import {ItemCobroPagoPerfilModule} from '../item-cobro-pago-perfil/item-cobro-pago-perfil.module';
import {FormContainerModule} from '../../../../componentes/forms/form-container/form-container.module';
import {RippleModule} from 'primeng/ripple';


@NgModule({
  declarations: [
    ItemCobroPagoTablaComponent
  ],
  exports: [
    ItemCobroPagoTablaComponent,
  ],
  imports: [
    CommonModule,
    TableModule,
    CardModule,
    ButtonModule,
    MatTabsModule,
    MatIconModule,
    MatDialogModule,
    ItemCobroPagoPerfilModule,
    FormContainerModule,
    RippleModule
  ],
})
export class ItemCobroPagoTablaModule {
}
