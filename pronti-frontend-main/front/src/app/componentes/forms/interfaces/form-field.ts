import {FormGroup} from '@angular/forms';
import {MatStepperArray} from "../form-container/interfaces/mat-stepper-array";

export interface FormField {
  formControlName: string;
  help: string;
  formGroup: FormGroup;
  patternMessage?: string;
  fileMessage?: string;
  initialValue: any;
  disabled?: boolean;
  validators: any[];
  type: fieldType;
  valid: boolean;
  actualValue?: any;
  placeholder?: string;
  label: string;
  select?: SelectField;
  mask?: Mask;
  autoComplete?: AutoComplete;
  column?: '1' | '2' | '3' | '6' | '4' | '8' | '10' | '12';
  textarea?: TextAreaField;
  number?: NumberField;
  file?: FileField;
  inputNumber?: InputNumber;
  matStepper?: MatStepperArray;
  separator?: {
    html: string;
  };
}

export interface SelectField {
  options: any[];
  filterBy: string;
  filterPlaceholder: string;
  optionLabel: string;
  dataKey: string;
}

export interface Mask {
  maskTemplate: string;
  autoClear?: boolean;
}

export interface AutoComplete {
  suggestions: any[];
  field: string;
  delay?: number;
  emptyMessage?: string;
  inputId: string;
  originalFieldName?: string;
}

export enum fieldType {
  text = 'text',
  password = 'password',
  date = 'date',
  textarea = 'textarea',
  select = 'select',
  number = 'number',
  mask = 'mask',
  email = 'email',
  autoComplete = 'autoComplete',
  file = 'file',
  inputNumber = 'inputNumber',
  separator = 'separator',
}

export interface SearchAutoCompleteInterface {
  originalEvent: InputEvent;
  query: string;
  field: FormField;
  matStepper?: MatStepperArray;
}

export interface TextAreaField {
  rows?: number;
}

export interface NumberField {
  step?: number;
  min?: number;
  max?: number;
}

export interface FileField {
  typo: TipoArchivo;
  accept: string;
  tamanioMaximoEnBytes: number;
}

export enum TipoArchivo {
  Archivo = 'A',
  Imagen = 'I',
}

export interface NumberField {
  step?: number;
  min?: number;
  max?: number;
}

export interface InputNumber {
  mode?: 'decimal' | 'currency';
  suffix?: string;
  prefix?: string;
  min?: number;
  max?: number;
  step?: number;
  allowEmpty?: boolean;
  minFractionDigits?: number;
  maxFractionDigits?: number;
}
