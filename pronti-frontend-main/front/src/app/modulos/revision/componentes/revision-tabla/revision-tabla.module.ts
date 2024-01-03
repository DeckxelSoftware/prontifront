import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RevisionTablaComponent} from './revision-tabla.component';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';
import {RevisionPerfilModule} from '../revision-perfil/revision-perfil.module';
import {FormContainerModule} from '../../../../componentes/forms/form-container/form-container.module';


@NgModule({
  declarations: [
    RevisionTablaComponent
  ],
  exports: [
    RevisionTablaComponent,
  ],
  imports: [
    CommonModule,
    TableModule,
    CardModule,
    ButtonModule,
    MatTabsModule,
    MatIconModule,
    MatDialogModule,
    RevisionPerfilModule,
    FormContainerModule
  ],
})
export class RevisionTablaModule {
}
