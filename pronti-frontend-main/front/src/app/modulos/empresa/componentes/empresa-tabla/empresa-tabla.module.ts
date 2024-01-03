import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EmpresaTablaComponent} from './empresa-tabla.component';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';
import {EmpresaPerfilModule} from '../empresa-perfil/empresa-perfil.module';
import {FormContainerModule} from '../../../../componentes/forms/form-container/form-container.module';
import {RippleModule} from 'primeng/ripple';
import {ListaValoresDetalleModule} from '../../../lista-valores-detalle/lista-valores-detalle.module';


@NgModule({
  declarations: [
    EmpresaTablaComponent
  ],
  exports: [
    EmpresaTablaComponent,
  ],
  imports: [
    CommonModule,
    TableModule,
    CardModule,
    ButtonModule,
    MatTabsModule,
    MatIconModule,
    MatDialogModule,
    EmpresaPerfilModule,
    FormContainerModule,
    RippleModule,
    ListaValoresDetalleModule
  ],
})
export class EmpresaTablaModule {
}
