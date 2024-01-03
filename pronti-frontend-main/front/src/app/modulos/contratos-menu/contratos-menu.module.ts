import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContratosMenuRoutingModule } from './contratos-menu-routing.module';
import { ContratosMenuComponent } from './contratos-menu/contratos-menu.component';
import {CardModule} from 'primeng/card';


@NgModule({
  declarations: [
    ContratosMenuComponent
  ],
  imports: [
    CommonModule,
    ContratosMenuRoutingModule,
    CardModule
  ]
})
export class ContratosMenuModule { }
