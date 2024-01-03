import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProveedoresMenuRoutingModule } from './proveedores-menu-routing.module';
import { ProveedoresMenuComponent } from './proveedores-menu.component';
import {CardModule} from 'primeng/card';


@NgModule({
  declarations: [
    ProveedoresMenuComponent
  ],
    imports: [
        CommonModule,
        ProveedoresMenuRoutingModule,
        CardModule
    ]
})
export class ProveedoresMenuModule { }
