import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IngresoTablaComponent } from './ingreso-tabla.component';
import {TableModule} from 'primeng/table';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {MatTabsModule} from '@angular/material/tabs';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {TrabajadorPerfilModule} from '../trabajador-perfil/trabajador-perfil.module';
import {FormContainerModule} from '../../../../componentes/forms/form-container/form-container.module';
import {PipesModule} from '../../../../pipes/pipes.module';
import {AccordionModule} from 'primeng/accordion';



@NgModule({
  declarations: [
    IngresoTablaComponent
  ],
  exports: [
    IngresoTablaComponent
  ],
  imports: [
    CommonModule,
    TableModule,
    CardModule,
    ButtonModule,
    MatTabsModule,
    MatIconModule,
    MatDialogModule,
    TrabajadorPerfilModule,
    FormContainerModule,
    PipesModule,
    AccordionModule
  ]
})
export class IngresoTablaModule { }
