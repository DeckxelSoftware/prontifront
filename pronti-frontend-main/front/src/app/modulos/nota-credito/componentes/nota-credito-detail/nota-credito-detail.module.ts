import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotaCreditoDetailComponent } from './nota-credito-detail.component';
import {PipesModule} from '../../../../pipes/pipes.module';
import {TableModule} from 'primeng/table';
import {TabViewModule} from 'primeng/tabview';



@NgModule({
  declarations: [
    NotaCreditoDetailComponent
  ],
  imports: [
    CommonModule,
    PipesModule,
    TableModule,
    TabViewModule
  ],
  exports: [
    NotaCreditoDetailComponent
  ]
})
export class NotaCreditoDetailModule { }
