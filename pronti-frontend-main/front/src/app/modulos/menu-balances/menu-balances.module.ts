import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuBalancesRoutingModule } from './menu-balances-routing.module';
import { MenuBalancesComponent } from './menu-balances.component';
import {CardModule} from "primeng/card";


@NgModule({
  declarations: [
    MenuBalancesComponent
  ],
    imports: [
        CommonModule,
        MenuBalancesRoutingModule,
        CardModule
    ]
})
export class MenuBalancesModule { }
