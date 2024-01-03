import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NovedadesMenuRoutingModule } from './novedades-menu-routing.module';
import { NovedadesMenuComponent } from './novedades-menu.component';
import {CardModule} from 'primeng/card';


@NgModule({
  declarations: [
    NovedadesMenuComponent
  ],
    imports: [
        CommonModule,
        NovedadesMenuRoutingModule,
        CardModule
    ]
})
export class NovedadesMenuModule { }
