import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {FormFieldComponent} from "./form-field.component";
import {FormValidationsMessagesModule} from "../form-validations-messages/form-validations-messages.module";
import {DropdownModule} from "primeng/dropdown";
import {InputMaskModule} from "primeng/inputmask";
import {AutoCompleteModule} from "primeng/autocomplete";
import {InputNumberModule} from "primeng/inputnumber";



@NgModule({
  declarations: [
    FormFieldComponent
  ],
  exports: [
    FormFieldComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormValidationsMessagesModule,
    DropdownModule,
    InputMaskModule,
    AutoCompleteModule,
    InputNumberModule,
  ]
})
export class FormFieldModule { }
