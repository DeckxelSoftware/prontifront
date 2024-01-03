import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HistoricoPlanContratoTablaComponent} from './historico-plan-contrato-tabla.component';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';
import {HistoricoPlanContratoPerfilModule} from '../historico-plan-contrato-perfil/historico-plan-contrato-perfil.module';
import {FormContainerModule} from '../../../../componentes/forms/form-container/form-container.module';


@NgModule({
  declarations: [
    HistoricoPlanContratoTablaComponent
  ],
  exports: [
    HistoricoPlanContratoTablaComponent,
  ],
  imports: [
    CommonModule,
    TableModule,
    CardModule,
    ButtonModule,
    MatTabsModule,
    MatIconModule,
    MatDialogModule,
    HistoricoPlanContratoPerfilModule,
    FormContainerModule
  ],
})
export class HistoricoPlanContratoTablaModule {
}
