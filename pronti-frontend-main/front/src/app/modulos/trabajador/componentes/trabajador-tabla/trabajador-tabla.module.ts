import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TrabajadorTablaComponent} from './trabajador-tabla.component';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';
import {TrabajadorPerfilModule} from '../trabajador-perfil/trabajador-perfil.module';
import {FormContainerModule} from '../../../../componentes/forms/form-container/form-container.module';
import {PipesModule} from '../../../../pipes/pipes.module';
import {AccordionModule} from 'primeng/accordion';
import {MatMenuModule} from "@angular/material/menu";
import {ModalCrearTrabajadorModule} from "../modal-crear-trabajador/modal-crear-trabajador.module";
import {HttpPeriodoContableModule} from "../../../periodo-contable/servicios/http-periodo-contable-module";
import {HttpPeriodoLaboralModule} from "../../../periodo-laboral/servicios/http-periodo-laboral-module";


@NgModule({
  declarations: [
    TrabajadorTablaComponent
  ],
  exports: [
    TrabajadorTablaComponent,
  ],
  imports: [
    CommonModule,
    TableModule,
    CardModule,
    ButtonModule,
    MatTabsModule,
    MatIconModule,
    MatDialogModule,
    TrabajadorPerfilModule,
    FormContainerModule,
    PipesModule,
    AccordionModule,
    MatMenuModule,
    ModalCrearTrabajadorModule,
    HttpPeriodoLaboralModule
  ],
})
export class TrabajadorTablaModule {
}
