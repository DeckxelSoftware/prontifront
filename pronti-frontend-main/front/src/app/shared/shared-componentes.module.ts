import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormContainerModule} from '../componentes/forms/form-container/form-container.module';
import {MatDialogModule} from '@angular/material/dialog';
import {ListaValoresDetalleModule} from '../modulos/lista-valores-detalle/lista-valores-detalle.module';
import {CrearClienteModalComponent} from './crear-cliente-modal/crear-cliente-modal.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {StepsModule} from 'primeng/steps';
import {DropdownModule} from 'primeng/dropdown';
import {MatStepperIcon, MatStepperModule} from '@angular/material/stepper';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {ModalInicialClienteComponent} from './modal-inicial-cliente/modal-inicial-cliente.component';
import {ModalClienteMatStepperComponent} from './modal-cliente-mat-stepper/modal-cliente-mat-stepper.component';
import {HttpPrecioModule} from '../modulos/precio/servicios/http-precio-module';
import {
  HttpConfiguracionGeneralModule
} from '../modulos/configuracion-general/servicios/http-configuracion-general-module';
import {ModalSeleccionarCuotasComponent} from './modal-seleccionar-cuotas/modal-seleccionar-cuotas.component';
import {TableModule} from 'primeng/table';
import {FormlyModule} from '@ngx-formly/core';
import {ModalConfirmacionComponent} from './modal-confirmacion/modal-confirmacion.component';
import {CuotasViewTableComponent} from './cuotas-view-table/cuotas-view-table.component';
import {PipesModule} from '../pipes/pipes.module';
import {ModalDetallesFacturaComponent} from "./modal-detalles-factura/modal-detalles-factura.component";
import {MostrarFacturaModule} from "../modulos/factura/componentes/mostrar-factura/mostrar-factura.module";


@NgModule({

  declarations: [
    CrearClienteModalComponent,
    ModalInicialClienteComponent,
    ModalClienteMatStepperComponent,
    ModalSeleccionarCuotasComponent,
    ModalConfirmacionComponent,
    CuotasViewTableComponent,
    ModalDetallesFacturaComponent,

  ],
  imports: [
    CommonModule,
    FormContainerModule,
    MatDialogModule,
    ListaValoresDetalleModule,
    FormsModule,
    ReactiveFormsModule,
    AutoCompleteModule,
    StepsModule,
    DropdownModule,
    MatStepperModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    HttpPrecioModule,
    HttpConfiguracionGeneralModule,
    TableModule,
    FormlyModule,
    PipesModule,
    MostrarFacturaModule
  ],
  exports: [
    CuotasViewTableComponent
  ]
})
export class SharedComponentesModule {
}
