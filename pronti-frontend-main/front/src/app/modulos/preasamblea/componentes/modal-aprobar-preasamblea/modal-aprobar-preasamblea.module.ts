import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalAprobarPreasambleaComponent } from './modal-aprobar-preasamblea.component';
import {AccordionModule} from "primeng/accordion";
import {FormlyModule} from "@ngx-formly/core";
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    ModalAprobarPreasambleaComponent
  ],
  imports: [
    CommonModule,
    AccordionModule,
    FormlyModule,
    ReactiveFormsModule
  ]
})
export class ModalAprobarPreasambleaModule { }
