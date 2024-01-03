import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GestionInventarioMenuRoutingModule } from './gestion-inventario-menu-routing.module';
import { GestionInventarioMenuComponent } from './gestion-inventario-menu.component';
import {CardModule} from 'primeng/card';


@NgModule({
  declarations: [
    GestionInventarioMenuComponent
  ],
    imports: [
        CommonModule,
        GestionInventarioMenuRoutingModule,
        CardModule
    ]
})
export class GestionInventarioMenuModule { }
