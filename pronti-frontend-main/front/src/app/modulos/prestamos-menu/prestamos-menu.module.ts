import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrestamosMenuRoutingModule } from './prestamos-menu-routing.module';
import { PrestamosMenuComponent } from './prestamos-menu.component';
import {CardModule} from 'primeng/card';


@NgModule({
  declarations: [
    PrestamosMenuComponent
  ],
    imports: [
        CommonModule,
        PrestamosMenuRoutingModule,
        CardModule
    ]
})
export class PrestamosMenuModule { }
