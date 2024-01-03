import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MostrarFacturaComponent } from './mostrar-factura.component';
import {MatCardModule} from '@angular/material/card';
import {PipesModule} from '../../../../pipes/pipes.module';
import {MatTableModule} from '@angular/material/table';
import {TableModule} from 'primeng/table';
import {TabViewModule} from 'primeng/tabview';



@NgModule({
  declarations: [
    MostrarFacturaComponent
  ],
  exports: [
    MostrarFacturaComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    PipesModule,
    MatTableModule,
    TableModule,
    TabViewModule
  ]
})
export class MostrarFacturaModule { }
