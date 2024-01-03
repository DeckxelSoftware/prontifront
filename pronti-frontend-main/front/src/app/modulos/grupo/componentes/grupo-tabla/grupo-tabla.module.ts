import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GrupoTablaComponent} from './grupo-tabla.component';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';
import {GrupoPerfilModule} from '../grupo-perfil/grupo-perfil.module';
import {FormContainerModule} from '../../../../componentes/forms/form-container/form-container.module';
import {RippleModule} from 'primeng/ripple';
import {HttpClienteModule} from '../../../cliente/servicios/http-cliente-module';


@NgModule({
  declarations: [
    GrupoTablaComponent
  ],
  exports: [
    GrupoTablaComponent,
  ],
  imports: [
    CommonModule,
    TableModule,
    CardModule,
    ButtonModule,
    MatTabsModule,
    MatIconModule,
    MatDialogModule,
    GrupoPerfilModule,
    FormContainerModule,
    RippleModule,
    HttpClienteModule
  ],
})
export class GrupoTablaModule {
}
