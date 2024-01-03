import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ModalCrearProveedorComponent} from './modal-crear-proveedor.component';
import {DropdownModule} from 'primeng/dropdown';
import {MatStepperModule} from '@angular/material/stepper';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {FormContainerModule} from '../../../../componentes/forms/form-container/form-container.module';
import {MatDialogModule} from '@angular/material/dialog';
import {ListaValoresDetalleModule} from '../../../lista-valores-detalle/lista-valores-detalle.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {StepsModule} from 'primeng/steps';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {HttpUsuarioModule} from '../../../usuario/servicios/http-usuario-module';
import {HttpEmpresaModule} from '../../../empresa/servicios/http-empresa-module';


@NgModule({
  declarations: [
    ModalCrearProveedorComponent
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
    MatCheckboxModule,
    MatSlideToggleModule,
    HttpUsuarioModule,
    HttpEmpresaModule,
  ],
  exports: [
    ModalCrearProveedorComponent
  ]
})
export class ModalCrearProveedorModule {
}
