import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ModalPlanCuentasComponent} from './modal-plan-cuentas.component';
import {FormlyModule} from '@ngx-formly/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AutoCompleteModule} from "primeng/autocomplete";
import {HttpCuentaContableModule} from "../../../cuenta-contable/servicios/http-cuenta-contable-module";

import {InputTextModule} from 'primeng/inputtext';
import {InputNumberModule} from 'primeng/inputnumber';

@NgModule({
  declarations: [
    ModalPlanCuentasComponent
  ],
  imports: [
    CommonModule,
    FormlyModule,
    ReactiveFormsModule,
    AutoCompleteModule,
    FormsModule,
    HttpCuentaContableModule,
    InputTextModule,
    InputNumberModule
  ]
})
export class ModalPlanCuentasModule {
}
