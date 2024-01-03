import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RolPagoTablaComponent} from './rol-pago-tabla.component';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';
import {RolPagoPerfilModule} from '../rol-pago-perfil/rol-pago-perfil.module';
import {FormContainerModule} from "../../../../componentes/forms/form-container/form-container.module";
import {HttpPeriodoLaboralModule} from "../../../periodo-laboral/servicios/http-periodo-laboral-module";
import {HttpHistorialLaboralModule} from "../../../historial-laboral/servicios/http-historial-laboral-module";
import {PipesModule} from "../../../../pipes/pipes.module";
import { HttpInformacionFinancieraModule } from '../../../informacion-financiera/servicios/http-informacion-financiera-module';


@NgModule({
  declarations: [
    RolPagoTablaComponent
  ],
  exports: [
    RolPagoTablaComponent,
  ],
  imports: [
    CommonModule,
    TableModule,
    CardModule,
    ButtonModule,
    MatTabsModule,
    MatIconModule,
    MatDialogModule,
    RolPagoPerfilModule,
    FormContainerModule,
    HttpPeriodoLaboralModule,
    HttpHistorialLaboralModule,
    HttpInformacionFinancieraModule,
    PipesModule,
  ],
})
export class RolPagoTablaModule {
}
