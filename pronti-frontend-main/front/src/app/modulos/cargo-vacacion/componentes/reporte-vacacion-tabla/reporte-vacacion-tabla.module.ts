import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReporteVacacionTablaComponent } from './reporte-vacacion-tabla.component';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { CargoVacacionPerfilModule } from '../cargo-vacacion-perfil/cargo-vacacion-perfil.module';
import { FormContainerModule } from '../../../../componentes/forms/form-container/form-container.module';
import { PipesModule } from '../../../../pipes/pipes.module';
import { RegistroVacacionTablaModule } from '../../../registro-vacacion/componentes/registro-vacacion-tabla/registro-vacacion-tabla.module';



@NgModule({
  declarations: [
    ReporteVacacionTablaComponent
  ],
  imports: [
    CommonModule,
    TableModule,
    CardModule,
    ButtonModule,
    MatTabsModule,
    MatIconModule,
    MatDialogModule,
    CargoVacacionPerfilModule,
    FormContainerModule,
    PipesModule,
    RegistroVacacionTablaModule
  ],
  exports: [
    ReporteVacacionTablaComponent
  ]
})
export class ReporteVacacionTablaModule { }
