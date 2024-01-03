import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PrecioTablaComponent} from './precio-tabla.component';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';
import {PrecioPerfilModule} from '../precio-perfil/precio-perfil.module';
import {FormContainerModule} from '../../../../componentes/forms/form-container/form-container.module';


@NgModule({
  declarations: [
    PrecioTablaComponent
  ],
  exports: [
    PrecioTablaComponent,
  ],
  imports: [
    CommonModule,
    TableModule,
    CardModule,
    ButtonModule,
    MatTabsModule,
    MatIconModule,
    MatDialogModule,
    PrecioPerfilModule,
    FormContainerModule
  ],
})
export class PrecioTablaModule {
}
