import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportesMenuPersonalRoutingModule } from './reportes-menu-personal-routing.module';
import { ReportesMenuPersonalComponent } from './reportes-menu-personal.component';
import { CardModule } from 'primeng/card';
import { BreadcrumbModule } from 'primeng/breadcrumb';


@NgModule({
  declarations: [
    ReportesMenuPersonalComponent
  ],
  imports: [
    CommonModule,
    ReportesMenuPersonalRoutingModule,
    CardModule,
    BreadcrumbModule,
  ]
})
export class ReportesMenuPersonalModule { }
