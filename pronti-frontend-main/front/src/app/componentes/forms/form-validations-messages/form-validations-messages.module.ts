import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormValidationsMessagesComponent} from "./form-validations-messages.component";



@NgModule({
  declarations: [
    FormValidationsMessagesComponent
  ],
  exports: [
    FormValidationsMessagesComponent
  ],
  imports: [
    CommonModule
  ]
})
export class FormValidationsMessagesModule { }
