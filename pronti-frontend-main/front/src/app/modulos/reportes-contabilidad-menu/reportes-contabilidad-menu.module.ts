import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportesContabilidadMenuRoutingModule } from './reportes-contabilidad-menu-routing.module';
import { ReportesContabilidadMenuComponent } from './reportes-contabilidad-menu.component';
import {BreadcrumbModule} from "primeng/breadcrumb";
import {CardModule} from "primeng/card";


@NgModule({
  declarations: [
    ReportesContabilidadMenuComponent
  ],
  imports: [
    CommonModule,
    ReportesContabilidadMenuRoutingModule,
    BreadcrumbModule,
    CardModule
  ]
})
export class ReportesContabilidadMenuModule { }
