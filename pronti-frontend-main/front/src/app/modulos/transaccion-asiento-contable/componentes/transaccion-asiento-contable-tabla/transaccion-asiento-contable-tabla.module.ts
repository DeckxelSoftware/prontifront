import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TransaccionAsientoContableTablaComponent} from './transaccion-asiento-contable-tabla.component';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';
import {TransaccionAsientoContablePerfilModule} from '../transaccion-asiento-contable-perfil/transaccion-asiento-contable-perfil.module';
import {FormContainerModule} from "../../../../componentes/forms/form-container/form-container.module";
import {RippleModule} from 'primeng/ripple';
import {
  CardAsientoContableCabeceraModule
} from "../card-asiento-contable-cabecera/card-asiento-contable-cabecera.module";
import {PipesModule} from "../../../../pipes/pipes.module";
import {
  CardAsientoContableCabeceraHeaderModule
} from "../../../asiento-contable-cabecera/componentes/card-asiento-contable-cabecera-header/card-asiento-contable-cabecera-header.module";


@NgModule({
  declarations: [
    TransaccionAsientoContableTablaComponent
  ],
  exports: [
    TransaccionAsientoContableTablaComponent,
  ],
    imports: [
        CommonModule,
        TableModule,
        CardModule,
        ButtonModule,
        MatTabsModule,
        MatIconModule,
        MatDialogModule,
        TransaccionAsientoContablePerfilModule,
        FormContainerModule,
        RippleModule,
        CardAsientoContableCabeceraModule,
        PipesModule,
        CardAsientoContableCabeceraHeaderModule
    ],
})
export class TransaccionAsientoContableTablaModule {
}
