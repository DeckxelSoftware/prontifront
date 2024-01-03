import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl, FormControl} from "@angular/forms";
import {FormField} from '../interfaces/form-field';

@Component({
  selector: 'app-form-validations-messages',
  templateUrl: './form-validations-messages.component.html',
  styleUrls: ['./form-validations-messages.component.scss']
})
export class FormValidationsMessagesComponent {

  @Input()
  label: string = '';

  @Input()
  control?: AbstractControl | null;

  @Input()
  field?: FormField;

  minLength = 0;

  tamanioMaximoEnBytes = 0;

  constructor() {
    setTimeout(
      () => {
        if (this.field) {
          if (this.field.file) {
            this.tamanioMaximoEnBytes = this.field.file.tamanioMaximoEnBytes;
          }
        }
      },
      1
    )
  }

  setMinLength(control: AbstractControl) {
    if (control.errors) {

    }
  }

  emailError(x: any) {
    return x.errors.email
  }


}
