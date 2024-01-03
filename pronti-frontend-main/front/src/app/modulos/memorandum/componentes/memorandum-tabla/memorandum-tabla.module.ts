import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MemorandumTablaComponent} from './memorandum-tabla.component';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';
import {MemorandumPerfilModule} from '../memorandum-perfil/memorandum-perfil.module';
import {FormContainerModule} from '../../../../componentes/forms/form-container/form-container.module';
import {PipesModule} from '../../../../pipes/pipes.module';


@NgModule({
  declarations: [
    MemorandumTablaComponent
  ],
  exports: [
    MemorandumTablaComponent,
  ],
    imports: [
        CommonModule,
        TableModule,
        CardModule,
        ButtonModule,
        MatTabsModule,
        MatIconModule,
        MatDialogModule,
        MemorandumPerfilModule,
        FormContainerModule,
        PipesModule
    ],
})
export class MemorandumTablaModule {
}
