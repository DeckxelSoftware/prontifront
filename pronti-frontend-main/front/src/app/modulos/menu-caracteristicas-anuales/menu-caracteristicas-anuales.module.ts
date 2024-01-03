import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuCaracteristicasAnualesRoutingModule } from './menu-caracteristicas-anuales-routing.module';
import { MenuCaracteristicasAnualesComponent } from './menu-caracteristicas-anuales.component';
import {CardModule} from "primeng/card";


@NgModule({
  declarations: [
    MenuCaracteristicasAnualesComponent
  ],
  imports: [
    CommonModule,
    MenuCaracteristicasAnualesRoutingModule,
    CardModule
  ]
})
export class MenuCaracteristicasAnualesModule { }
