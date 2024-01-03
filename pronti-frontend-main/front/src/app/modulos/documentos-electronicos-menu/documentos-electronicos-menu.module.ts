import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentosElectronicosMenuRoutingModule } from './documentos-electronicos-menu-routing.module';
import { DocumentosElectronicosMenuComponent } from './documentos-electronicos-menu.component';
import {CardModule} from 'primeng/card';


@NgModule({
  declarations: [
    DocumentosElectronicosMenuComponent
  ],
  imports: [
    CommonModule,
    DocumentosElectronicosMenuRoutingModule,
    CardModule
  ]
})
export class DocumentosElectronicosMenuModule { }
