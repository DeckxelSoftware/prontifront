import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HistoricoRolTablaComponent} from './historico-rol-tabla.component';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';
import {HistoricoRolPerfilModule} from '../historico-rol-perfil/historico-rol-perfil.module';
import { FormContainerModule } from '../../../../componentes/forms/form-container/form-container.module';


@NgModule({
  declarations: [
    HistoricoRolTablaComponent
  ],
  exports: [
    HistoricoRolTablaComponent,
  ],
  imports: [
    CommonModule,
    TableModule,
    CardModule,
    ButtonModule,
    MatTabsModule,
    MatIconModule,
    MatDialogModule,
    HistoricoRolPerfilModule,
    FormContainerModule
  ],
})
export class HistoricoRolTablaModule {
}
