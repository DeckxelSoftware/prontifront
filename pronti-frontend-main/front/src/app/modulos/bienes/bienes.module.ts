import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BienesRoutingModule } from './bienes-routing.module';
import { BienesMenuComponent } from './bienes-menu.component';
import {ArticuloModule} from '../articulo/articulo.module';
import {CardModule} from 'primeng/card';


@NgModule({
  declarations: [
    BienesMenuComponent
  ],
  imports: [
    CommonModule,
    BienesRoutingModule,
    ArticuloModule,
    CardModule,
  ]
})
export class BienesModule { }
