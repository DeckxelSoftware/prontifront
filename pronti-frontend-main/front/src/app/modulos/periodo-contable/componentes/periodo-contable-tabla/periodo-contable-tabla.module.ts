import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PeriodoContableTablaComponent} from './periodo-contable-tabla.component';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';
import {PeriodoContablePerfilModule} from '../periodo-contable-perfil/periodo-contable-perfil.module';
import {FormContainerModule} from '../../../../componentes/forms/form-container/form-container.module';
import {PipesModule} from '../../../../pipes/pipes.module';


@NgModule({
  declarations: [
    PeriodoContableTablaComponent
  ],
  exports: [
    PeriodoContableTablaComponent,
  ],
  imports: [
    CommonModule,
    TableModule,
    CardModule,
    ButtonModule,
    MatTabsModule,
    MatIconModule,
    MatDialogModule,
    PeriodoContablePerfilModule,
    FormContainerModule,
    PipesModule,
  ],
})
export class PeriodoContableTablaModule {
}
