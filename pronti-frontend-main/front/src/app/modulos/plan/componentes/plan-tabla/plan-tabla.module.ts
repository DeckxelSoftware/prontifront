import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PlanTablaComponent} from './plan-tabla.component';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';
import {PlanPerfilModule} from '../plan-perfil/plan-perfil.module';
import {FormContainerModule} from '../../../../componentes/forms/form-container/form-container.module';
import {FileUploadModule} from "primeng/fileupload";


@NgModule({
  declarations: [
    PlanTablaComponent
  ],
  exports: [
    PlanTablaComponent,
  ],
    imports: [
        CommonModule,
        TableModule,
        CardModule,
        ButtonModule,
        MatTabsModule,
        MatIconModule,
        MatDialogModule,
        PlanPerfilModule,
        FormContainerModule,
        FileUploadModule
    ],
})
export class PlanTablaModule {
}
