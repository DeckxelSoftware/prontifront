import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CaracteristicasAnualesMenuRoutingModule } from './caracteristicas-anuales-menu-routing.module';
import { CaracteristicasAnualesMenuComponent } from './caracteristicas-anuales-menu.component';
import {CardModule} from 'primeng/card';


@NgModule({
  declarations: [
    CaracteristicasAnualesMenuComponent
  ],
    imports: [
        CommonModule,
        CaracteristicasAnualesMenuRoutingModule,
        CardModule
    ]
})
export class CaracteristicasAnualesMenuModule { }
