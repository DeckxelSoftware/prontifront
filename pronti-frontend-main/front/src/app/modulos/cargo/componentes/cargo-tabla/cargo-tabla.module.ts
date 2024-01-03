import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CargoTablaComponent} from './cargo-tabla.component';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';
import {CargoPerfilModule} from '../cargo-perfil/cargo-perfil.module';
import {FormContainerModule} from '../../../../componentes/forms/form-container/form-container.module';


@NgModule({
  declarations: [
    CargoTablaComponent
  ],
  exports: [
    CargoTablaComponent,
  ],
  imports: [
    CommonModule,
    TableModule,
    CardModule,
    ButtonModule,
    MatTabsModule,
    MatIconModule,
    MatDialogModule,
    CargoPerfilModule,
    FormContainerModule
  ],
})
export class CargoTablaModule {
}
