import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContabilidadMenuRoutingModule } from './contabilidad-menu-routing.module';
import { ContabilidadMenuComponent } from './contabilidad-menu.component';
import {CardModule} from 'primeng/card';
import {SplitButtonModule} from 'primeng/splitbutton';



@NgModule({
  declarations: [
    ContabilidadMenuComponent
  ],
  imports: [
    CommonModule,
    ContabilidadMenuRoutingModule,
    CardModule,
    SplitButtonModule
  ]
})
export class ContabilidadMenuModule { }
