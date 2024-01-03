import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FacturaTablaComponent} from './factura-tabla.component';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';
import {FacturaPerfilModule} from '../factura-perfil/factura-perfil.module';
import {FormContainerModule} from '../../../../componentes/forms/form-container/form-container.module';
import {MostrarFacturaModule} from '../mostrar-factura/mostrar-factura.module';


@NgModule({
  declarations: [
    FacturaTablaComponent
  ],
  exports: [
    FacturaTablaComponent,
  ],
  imports: [
    CommonModule,
    TableModule,
    CardModule,
    ButtonModule,
    MatTabsModule,
    MatIconModule,
    MatDialogModule,
    FacturaPerfilModule,
    FormContainerModule,
    MostrarFacturaModule
  ],
})
export class FacturaTablaModule {
}
