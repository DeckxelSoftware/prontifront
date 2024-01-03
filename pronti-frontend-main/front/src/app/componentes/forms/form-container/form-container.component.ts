import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {fieldType, FormField, SearchAutoCompleteInterface} from '../interfaces/form-field';
import {MatStepperArray} from './interfaces/mat-stepper-array';
import {MatStepperConfig} from "./interfaces/mat-stepper-config";

@Component({
  selector: 'app-form-container',
  templateUrl: './form-container.component.html',
  styleUrls: ['./form-container.component.scss']
})
export class FormContainerComponent implements OnInit {

  @Output()
  fieldChanged = new EventEmitter<FormField>();

  @Input()
  fieldsArray: FormField[] = [];

  @Input()
  matStepperArray: MatStepperArray[] = [];

  @Input()
  matStepperConfig?: MatStepperConfig;

  @Output()
  autoCompleteChangedEmitter = new EventEmitter<SearchAutoCompleteInterface>();

  @Output()
  confirmFormEmitter = new EventEmitter<FormContainerComponent>();

  showForm = false;

  formGroup = new FormGroup({});

  constructor(private readonly formBuilder: FormBuilder
  ) {
  }

  ngOnInit(): void {
    let controls: any = {};
    this.fieldsArray.forEach((field) => {
      if (field.type === fieldType.autoComplete && field.autoComplete) {
        let fieldObject: any = {};
        fieldObject[field.autoComplete.field] = field.initialValue;
        field.initialValue = fieldObject;
      }
      let controlField: any = {
        [field.formControlName]: new FormControl({
            value: field.initialValue,
            disabled: field.disabled
          }, [...field.validators]
        )
      };
      controls = {
        ...controls,
        ...controlField
      };
    });
    this.formGroup = this.formBuilder.group(controls);
    this.fieldsArray.forEach((field, index) => {
      this.fieldsArray[index].formGroup = this.formGroup
    });
    if (this.matStepperArray.length > 0 && this.matStepperConfig) {
      this.matStepperArray = this.matStepperArray.map(
        (matStepper) => {
          if (matStepper.fieldsArray) {
            let arrayControl: any = {};
            matStepper.fieldsArray.forEach(
              (field) => {
                if (field.type === fieldType.autoComplete && field.autoComplete) {
                  let fieldObject: any = {};
                  fieldObject[field.autoComplete.field] = field.initialValue;
                  field.initialValue = fieldObject;
                }
                let controlField: any = {
                  [field.formControlName]: new FormControl({
                      value: field.initialValue,
                      disabled: field.disabled
                    }, [...field.validators]
                  )
                };
                arrayControl = {
                  ...arrayControl,
                  ...controlField
                };
              });
            matStepper.formGroup = this.formBuilder.group(arrayControl);
            matStepper.fieldsArray.forEach((field, index) => {
              if (matStepper.fieldsArray) {
                matStepper.fieldsArray[index].formGroup = matStepper.formGroup
              }
            });
          }
          console.log(matStepper);
          return matStepper;
        }
      );
      this.showForm = true;
    } else {
      if (this.matStepperArray.length > 0) {
        console.warn({mensaje: 'No envia la configuracion del stepper'});
      }
      this.showForm = true;
    }
  }

  fieldChangedEvent(event: FormField, matStepper?: MatStepperArray) {
    event.matStepper = matStepper;
    setTimeout(() => this.fieldChanged.emit(event), 1);
  }

  autoCompleteChanged(event: SearchAutoCompleteInterface, matStepper?: MatStepperArray) {
    event.matStepper = matStepper;
    this.autoCompleteChangedEmitter.emit(event);
  }

  confirmForm(){
    this.confirmFormEmitter.emit(this);
  }

}
