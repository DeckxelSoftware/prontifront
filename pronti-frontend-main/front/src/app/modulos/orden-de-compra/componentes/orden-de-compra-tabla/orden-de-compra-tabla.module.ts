import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OrdenDeCompraTablaComponent} from './orden-de-compra-tabla.component';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';
import {OrdenDeCompraPerfilModule} from '../orden-de-compra-perfil/orden-de-compra-perfil.module';
import {FormContainerModule} from '../../../../componentes/forms/form-container/form-container.module';
import {RippleModule} from 'primeng/ripple';


@NgModule({
  declarations: [
    OrdenDeCompraTablaComponent
  ],
  exports: [
    OrdenDeCompraTablaComponent,
  ],
    imports: [
        CommonModule,
        TableModule,
        CardModule,
        ButtonModule,
        MatTabsModule,
        MatIconModule,
        MatDialogModule,
        OrdenDeCompraPerfilModule,
        FormContainerModule,
        RippleModule
    ],
})
export class OrdenDeCompraTablaModule {
}
