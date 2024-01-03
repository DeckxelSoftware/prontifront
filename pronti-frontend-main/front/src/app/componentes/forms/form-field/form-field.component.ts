import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {fieldType, FormField, SearchAutoCompleteInterface} from "../interfaces/form-field";
import {FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss']
})
export class FormFieldComponent implements OnInit {

  @Input()
  field?: FormField;

  @Output()
  fieldChanged = new EventEmitter<FormField>();

  @Output()
  autoCompleteChangedEmitter = new EventEmitter<SearchAutoCompleteInterface>();
  required = false;

  file: any;
  src: any;

  constructor() {
  }

  ngOnInit(): void {
    if (this.field) {
      const control = this.field.formGroup.get(this.field.formControlName);
      if (control) {
        this.required = control.hasValidator(Validators.required);
        control.valueChanges.subscribe((actualValue: any) => {
          if (this.field) {
            const commonFields = this.field.type === fieldType.text ||
              this.field.type === fieldType.select ||
              this.field.type === fieldType.textarea ||
              this.field.type === fieldType.date ||
              this.field.type === fieldType.password ||
              this.field.type === fieldType.email ||
              this.field.type === fieldType.number ||
              this.field.type === fieldType.autoComplete||
              this.field.type === fieldType.inputNumber;
            if (commonFields) {
              this.field.valid = control.valid;
              this.field.actualValue = actualValue;
              this.fieldChanged.emit(this.field);
            }
            if (this.field.type === fieldType.mask) {
              this.field.valid = control.valid;
              this.field.actualValue = actualValue;
              this.fieldChanged.emit(this.field);
            }
          }
        });
      }
    }
  }

  autoCompleteChanged(event: any) {
    this.autoCompleteChangedEmitter.emit({
      ...event,
      field: this.field
    });
  }


  validarImagenesSoportadas(tipoArchivo?: string) {
    if (!tipoArchivo) {
      return false;
    } else {
      const imagenesSoportadas = [
        'image/png',
        'image/jpeg',
        'image/gif',
        'image/bmp'
      ];
      return imagenesSoportadas.some((a) => a === tipoArchivo);
    }
  }
  cambioArchivo(evento: any) {
    const fileList: FileList = evento.target.files;
    if (evento.target.files.length > 0) {
      const file: File = fileList[0];
      const reader = new FileReader();
      reader.onload = (eventoLecturaArchivo: any) => {
        this.src = eventoLecturaArchivo.target.result;
      };
      reader.readAsDataURL(file);
      this.file = file;
      if (this.field) {
        if (this.field.file) {
          const f = this.field
            .formGroup as FormGroup;
          if (file.size <= this.field.file.tamanioMaximoEnBytes) {
            this.field.valid = f.controls[this.field.formControlName].valid;
            this.field.actualValue = this.file;
            this.fieldChanged.emit(this.field);
          } else {
            const formulario = this.field.formGroup as FormGroup;
            const componente = f
              .get(this.field.formControlName);
            if (componente) {
              componente.setErrors({
                archivo: true
              });
            }
            this.field.valid = false;
            formulario.controls[this.field.formControlName].setErrors({
              ...formulario.controls[this.field.formControlName].errors
            });
            this.field.actualValue = this.file;
            this.fieldChanged.emit(this.field);
          }
        }
      }
    }
  }

}
