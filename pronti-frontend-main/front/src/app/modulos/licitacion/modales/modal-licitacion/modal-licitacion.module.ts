import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ModalLicitacionComponent} from './modal-licitacion.component';
import {MatDialogModule} from '@angular/material/dialog';
import {ContratoTablaModule} from '../../../contrato/componentes/contrato-tabla/contrato-tabla.module';
import {HttpContratoModule} from '../../../contrato/servicios/http-contrato-module';
import {EstadoContratoModule} from '../../../../servicios/estado-contrato/estado-contrato.module';
import {StorageCesionDerechosService} from '../../../contrato/servicios/storage-cesion-derechos.service';
import {MatCardModule} from '@angular/material/card';
import {FormlyModule} from '@ngx-formly/core';
import {ReactiveFormsModule} from '@angular/forms';
import {PipesModule} from '../../../../pipes/pipes.module';


@NgModule({
  declarations: [
    ModalLicitacionComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    ContratoTablaModule,
    HttpContratoModule,
    EstadoContratoModule,
    MatCardModule,
    FormlyModule,
    ReactiveFormsModule,
    PipesModule,
  ],
  providers: [
    StorageCesionDerechosService
  ],
  exports: [
    ModalLicitacionComponent
  ]
})
export class ModalLicitacionModule {
}
