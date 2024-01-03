import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CabeceraCompraTablaComponent} from './cabecera-compra-tabla.component';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';
import {CabeceraCompraPerfilModule} from '../cabecera-compra-perfil/cabecera-compra-perfil.module';
import {FormContainerModule} from "../../../../componentes/forms/form-container/form-container.module";
import {MatCardModule} from "@angular/material/card";


@NgModule({
  declarations: [
    CabeceraCompraTablaComponent
  ],
  exports: [
    CabeceraCompraTablaComponent,
  ],
  imports: [
    CommonModule,
    TableModule,
    CardModule,
    ButtonModule,
    MatTabsModule,
    MatIconModule,
    MatDialogModule,
    CabeceraCompraPerfilModule,
    FormContainerModule,
    MatCardModule
  ],
})
export class CabeceraCompraTablaModule {
}
