import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuComprasRoutingModule } from './menu-compras-routing.module';
import { MenuComprasComponent } from './menu-compras.component';
import {BreadcrumbModule} from "primeng/breadcrumb";
import {CardModule} from "primeng/card";


@NgModule({
  declarations: [
    MenuComprasComponent
  ],
  imports: [
    CommonModule,
    MenuComprasRoutingModule,
    BreadcrumbModule,
    CardModule
  ]
})
export class MenuComprasModule { }
