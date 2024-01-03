import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RecursoTablaComponent} from './recurso-tabla.component';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';
import {RecursoPerfilModule} from '../recurso-perfil/recurso-perfil.module';
import {FormContainerModule} from "../../../../componentes/forms/form-container/form-container.module";


@NgModule({
  declarations: [
    RecursoTablaComponent
  ],
  exports: [
    RecursoTablaComponent,
  ],
  imports: [
    CommonModule,
    TableModule,
    CardModule,
    ButtonModule,
    MatTabsModule,
    MatIconModule,
    MatDialogModule,
    RecursoPerfilModule,
    FormContainerModule
  ],
})
export class RecursoTablaModule {
}
