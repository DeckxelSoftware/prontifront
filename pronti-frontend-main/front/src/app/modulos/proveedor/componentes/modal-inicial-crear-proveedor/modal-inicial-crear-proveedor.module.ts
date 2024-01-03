import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalInicialCrearProveedorComponent } from './modal-inicial-crear-proveedor.component';
import {FormContainerModule} from '../../../../componentes/forms/form-container/form-container.module';
import {MatDialogModule} from '@angular/material/dialog';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {DropdownModule} from 'primeng/dropdown';



@NgModule({
  declarations: [
    ModalInicialCrearProveedorComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    DropdownModule,
  ]
})
export class ModalInicialCrearProveedorModule { }
