import {FormGroup, Validators} from '@angular/forms';
import {FormPlanEnum} from './form-plan.enum';
import {fieldType, FormField} from '../../../componentes/forms/interfaces/form-field';

export const FORM_PLAN: () => (FormField[]) = () => {
  const arregloCampos: FormField[] = [


    {
      type: fieldType.text,
      label: 'Modelo',
      formControlName: FormPlanEnum.modelo,
      placeholder: 'Ej: Plan auto',
      initialValue: "",
      help: 'Ingrese el modelo',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        Validators.required,
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
    },
    //
    {
      type: fieldType.inputNumber,
      label: 'Precio',
      formControlName: FormPlanEnum.precio,
      placeholder: 'Ej: 6000',
      initialValue: "",
      help: 'Ingrese un precio',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        Validators.required,
        Validators.min(0),
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      inputNumber: {
        prefix: '$',
        min: 0,
        minFractionDigits: 2,
        maxFractionDigits: 2,
      },
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
    },

    {
      type: fieldType.inputNumber,
      label: 'Inscripción',
      formControlName: FormPlanEnum.inscripcion,
      placeholder: 'Ej: 180',
      initialValue: "",
      help: 'Ingrese el valor de la inscripción',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        Validators.required,
        Validators.min(0),
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      inputNumber: {
        prefix: '$',
        min: 0,
        minFractionDigits: 2,
        maxFractionDigits: 2,
      },
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
    },
    {
      type: fieldType.inputNumber,
      label: 'Cuota mes 12',
      formControlName: FormPlanEnum.cuotaMes12,
      placeholder: 'Ej: 12',
      initialValue: "",
      help: 'Ingrese la cuota del plazo 12',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        Validators.required,
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
      inputNumber: {
        prefix: '$',
        min: 0,
        minFractionDigits: 2,
        maxFractionDigits: 2,
      }
    },
    {
      type: fieldType.inputNumber,
      label: 'Cuota mes 24',
      formControlName: FormPlanEnum.cuotaMes24,
      placeholder: 'Ej: 24',
      initialValue: "",
      help: 'Ingrese la cuota del plazo 24',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        Validators.required,
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
      inputNumber: {
        prefix: '$',
        min: 0,
        minFractionDigits: 2,
        maxFractionDigits: 2,
      }
    },
    {
      type: fieldType.inputNumber,
      label: 'Cuota mes 36',
      formControlName: FormPlanEnum.cuotaMes36,
      placeholder: 'Ej: 36',
      initialValue: "",
      help: 'Ingrese la cuota del plazo 36',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        Validators.required,
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
      inputNumber: {
        prefix: '$',
        min: 0,
        minFractionDigits: 2,
        maxFractionDigits: 2,
      }
    },
    {
      type: fieldType.inputNumber,
      label: 'Cuota mes 48',
      formControlName: FormPlanEnum.cuotaMes36,
      placeholder: 'Ej: 48',
      initialValue: "",
      help: 'Ingrese la cuota del plazo 48',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        Validators.required,
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
      inputNumber: {
        prefix: '$',
        min: 0,
        minFractionDigits: 2,
        maxFractionDigits: 2,
      }
    },
    {
      type: fieldType.inputNumber,
      label: 'Cuota mes 60',
      formControlName: FormPlanEnum.cuotaMes60,
      placeholder: 'Ej: 60',
      initialValue: "",
      help: 'Ingrese la cuota del plazo 60',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        Validators.required,
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
      inputNumber: {
        prefix: '$',
        min: 0,
        minFractionDigits: 2,
        maxFractionDigits: 2,
      }
    },
    {
      type: fieldType.inputNumber,
      label: 'Cuota mes ',
      formControlName: FormPlanEnum.cuotaMes72,
      placeholder: 'Ej: 72',
      initialValue: "",
      help: 'Ingrese la cuota del plazo 72',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        Validators.required,
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
      inputNumber: {
        prefix: '$',
        min: 0,
        minFractionDigits: 2,
        maxFractionDigits: 2,
      }
    },
    {
      type: fieldType.inputNumber,
      label: 'Cuota mes 84',
      formControlName: FormPlanEnum.cuotaMes84,
      placeholder: 'Ej: 84',
      initialValue: "",
      help: 'Ingrese la cuota del plazo 84',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        Validators.required,
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
      inputNumber: {
        prefix: '$',
        min: 0,
        minFractionDigits: 2,
        maxFractionDigits: 2,
      }
    },
  ]
  return arregloCampos;
}
