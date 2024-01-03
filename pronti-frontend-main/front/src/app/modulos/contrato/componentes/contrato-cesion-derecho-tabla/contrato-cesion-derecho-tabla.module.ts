import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContratoCesionDerechoTablaComponent } from './contrato-cesion-derecho-tabla.component';
import {TableModule} from 'primeng/table';
import {PipesModule} from '../../../../pipes/pipes.module';



@NgModule({
  declarations: [
    ContratoCesionDerechoTablaComponent
  ],
  imports: [
    CommonModule,
    TableModule,
    PipesModule
  ]
})
export class ContratoCesionDerechoTablaModule { }
