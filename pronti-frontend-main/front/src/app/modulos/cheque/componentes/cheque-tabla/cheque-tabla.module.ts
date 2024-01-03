import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChequeTablaComponent} from './cheque-tabla.component';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';
import {ChequePerfilModule} from '../cheque-perfil/cheque-perfil.module';
import {FormContainerModule} from '../../../../componentes/forms/form-container/form-container.module';
import {PipesModule} from '../../../../pipes/pipes.module';


@NgModule({
  declarations: [
    ChequeTablaComponent
  ],
  exports: [
    ChequeTablaComponent,
  ],
    imports: [
        CommonModule,
        TableModule,
        CardModule,
        ButtonModule,
        MatTabsModule,
        MatIconModule,
        MatDialogModule,
        ChequePerfilModule,
        FormContainerModule,
        PipesModule
    ],
})
export class ChequeTablaModule {
}
