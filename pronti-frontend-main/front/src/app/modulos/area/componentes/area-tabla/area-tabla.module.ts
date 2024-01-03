import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AreaTablaComponent} from './area-tabla.component';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';
import {AreaPerfilModule} from '../area-perfil/area-perfil.module';
import {FormContainerModule} from '../../../../componentes/forms/form-container/form-container.module';


@NgModule({
  declarations: [
    AreaTablaComponent
  ],
  exports: [
    AreaTablaComponent,
  ],
  imports: [
    CommonModule,
    TableModule,
    CardModule,
    ButtonModule,
    MatTabsModule,
    MatIconModule,
    MatDialogModule,
    AreaPerfilModule,
    FormContainerModule
  ],
})
export class AreaTablaModule {
}
