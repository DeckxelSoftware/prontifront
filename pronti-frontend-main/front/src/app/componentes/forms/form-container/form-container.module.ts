import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormContainerComponent } from './form-container.component';
import {ReactiveFormsModule} from "@angular/forms";
import {FormFieldModule} from "../form-field/form-field.module";
import { ShowFileComponent } from './show-file/show-file.component';
import {InputNumberModule} from "primeng/inputnumber";
import {MatStepperModule} from "@angular/material/stepper";



@NgModule({
  declarations: [
    FormContainerComponent,
    ShowFileComponent
  ],
  exports: [
    FormContainerComponent,
    ShowFileComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormFieldModule,
    InputNumberModule,
    MatStepperModule,
  ]
})
export class FormContainerModule { }
