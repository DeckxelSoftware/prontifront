import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfiguracionesRoutingModule } from './configuraciones-routing.module';
import { RutaConfiguracionesComponent } from './ruta-configuraciones.component';
import {CardModule} from 'primeng/card';


@NgModule({
  declarations: [
    RutaConfiguracionesComponent
  ],
  imports: [
    CommonModule,
    ConfiguracionesRoutingModule,
    CardModule
  ]
})
export class ConfiguracionesModule { }
