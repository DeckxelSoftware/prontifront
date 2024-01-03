import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LicitacionPreasambleaTablaComponent } from './licitacion-preasamblea-tabla.component';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';
import {LicitacionPerfilModule} from '../licitacion-perfil/licitacion-perfil.module';
import {FormContainerModule} from '../../../../componentes/forms/form-container/form-container.module';
import {PipesModule} from '../../../../pipes/pipes.module';



@NgModule({
  declarations: [
    LicitacionPreasambleaTablaComponent
  ],
  exports: [
    LicitacionPreasambleaTablaComponent
  ],
  imports: [
    CommonModule,
    TableModule,
    CardModule,
    ButtonModule,
    MatTabsModule,
    MatIconModule,
    MatDialogModule,
    LicitacionPerfilModule,
    FormContainerModule,
    PipesModule
  ]
})
export class LicitacionPreasambleaTablaModule { }
