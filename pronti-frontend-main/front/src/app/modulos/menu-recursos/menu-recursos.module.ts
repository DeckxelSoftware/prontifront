import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuRecursosRoutingModule } from './menu-recursos-routing.module';
import { MenuRecursosComponent } from './menu-recursos.component';
import {CardModule} from "primeng/card";


@NgModule({
  declarations: [
    MenuRecursosComponent
  ],
    imports: [
        CommonModule,
        MenuRecursosRoutingModule,
        CardModule
    ]
})
export class MenuRecursosModule { }
