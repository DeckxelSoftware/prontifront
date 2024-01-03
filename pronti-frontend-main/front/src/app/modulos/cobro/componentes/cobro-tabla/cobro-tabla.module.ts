import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CobroTablaComponent} from './cobro-tabla.component';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';
import {CobroPerfilModule} from '../cobro-perfil/cobro-perfil.module';
import {FormContainerModule} from "../../../../componentes/forms/form-container/form-container.module";
import {DetallePagoTablaModule} from "../../../cuota/componentes/detalle-pago-tabla/detalle-pago-tabla.module";
import {PagoTablaModule} from "../../../cuota/componentes/pago-tabla/pago-tabla.module";
import {PipesModule} from "../../../../pipes/pipes.module";


@NgModule({
  declarations: [
    CobroTablaComponent
  ],
  exports: [
    CobroTablaComponent,
  ],
  imports: [
    CommonModule,
    TableModule,
    CardModule,
    ButtonModule,
    MatTabsModule,
    MatIconModule,
    MatDialogModule,
    CobroPerfilModule,
    FormContainerModule,
    DetallePagoTablaModule,
    PagoTablaModule,
    PipesModule
  ],
})
export class CobroTablaModule {
}
