import {FormGroup, Validators} from '@angular/forms';
import {FormSriGastosEnum} from './form-sri-gastos.enum';
import {fieldType, FormField} from "../../../componentes/forms/interfaces/form-field";


export const FORM_SRI_GASTOS: () => (FormField[]) = () => {
  const arregloCampos: FormField[] = [
    {
      type: fieldType.inputNumber,
      label: 'Año',
      formControlName: FormSriGastosEnum.anio,
      placeholder: 'Ej: 2022',
      initialValue: "",
      help: 'Ingrese el año',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        // Validators.required,
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
      inputNumber: {
        maxFractionDigits: 0,
        minFractionDigits: 0
      }
    },
    {
      type: fieldType.inputNumber,
      label: 'Gasto vivienda',
      formControlName: FormSriGastosEnum.gastoVivienda,
      placeholder: 'Ej: 500',
      initialValue: "",
      help: 'Ingrese el gasto en vivienda',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        // Validators.required,
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
      inputNumber: {
        prefix: '$',
        maxFractionDigits: 2,
        minFractionDigits: 2
      }
    },
    {
      type: fieldType.inputNumber,
      label: 'Gasto educación',
      formControlName: FormSriGastosEnum.gastoEducacion,
      placeholder: 'Ej: 500',
      initialValue: "",
      help: 'Ingrese el gasto en educación',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        // Validators.required,
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
      inputNumber: {
        prefix: '$',
        maxFractionDigits: 2,
        minFractionDigits: 2
      }
    },
    {
      type: fieldType.inputNumber,
      label: 'Gasto salud',
      formControlName: FormSriGastosEnum.gastoSalud,
      placeholder: 'Ej: 500',
      initialValue: "",
      help: 'Ingrese el gasto en salud',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        // Validators.required,
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
      inputNumber: {
        prefix: '$',
        maxFractionDigits: 2,
        minFractionDigits: 2
      }
    },
    {
      type: fieldType.inputNumber,
      label: 'Gasto vestido',
      formControlName: FormSriGastosEnum.gastoVestido,
      placeholder: 'Ej: 500',
      initialValue: "",
      help: 'Ingrese el gasto en vestido',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        // Validators.required,
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
      inputNumber: {
        prefix: '$',
        maxFractionDigits: 2,
        minFractionDigits: 2
      }
    },
    {
      type: fieldType.inputNumber,
      label: 'Gasto alimentación',
      formControlName: FormSriGastosEnum.gastoAlimento,
      placeholder: 'Ej: 500',
      initialValue: "",
      help: 'Ingrese el gasto en alimentación',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        // Validators.required,
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
      inputNumber: {
        prefix: '$',
        maxFractionDigits: 2,
        minFractionDigits: 2
      }
    },
    {
      type: fieldType.inputNumber,
      label: 'Gasto turismo',
      formControlName: FormSriGastosEnum.gastoTurismo,
      placeholder: 'Ej: 500',
      initialValue: "",
      help: 'Ingrese el gasto en turismo',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        // Validators.required,
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
      inputNumber: {
        prefix: '$',
        maxFractionDigits: 2,
        minFractionDigits: 2
      }
    },
    {
      type: fieldType.inputNumber,
      label: 'Discapacidad',
      formControlName: FormSriGastosEnum.discapacidad,
      placeholder: 'Ej: 500',
      initialValue: "",
      help: 'Ingrese el valor',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        // Validators.required,
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
      inputNumber: {
        prefix: '$',
        maxFractionDigits: 2,
        minFractionDigits: 2
      }
    },
    {
      type: fieldType.inputNumber,
      label: 'Tercera edad',
      formControlName: FormSriGastosEnum.terceraEdad,
      placeholder: 'Ej: 500',
      initialValue: "",
      help: 'Ingrese el valor',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        // Validators.required,
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
      inputNumber: {
        prefix: '$',
        maxFractionDigits: 2,
        minFractionDigits: 2
      }
    },
    {
      type: fieldType.inputNumber,
      label: 'Total gastos',
      formControlName: FormSriGastosEnum.totalGastos,
      placeholder: 'Ej: 500',
      initialValue: "",
      help: 'Ingrese el total de gastos',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        // Validators.required,
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
      inputNumber: {
        prefix: '$',
        maxFractionDigits: 2,
        minFractionDigits: 2
      }
    },
    // {
    //   type: fieldType.text,
    //   label: 'Nombre',
    //   formControlName: FormSriGastosEnum.nombre,
    //   placeholder: 'Ej: ....',
    //   initialValue: "",
    //   help: 'Ingrese el nombre',
    //   // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
    //   validators: [
    //     // Validators.required,
    //     // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
    //   ],
    //   formGroup: new FormGroup({}),
    //   valid: false,
    //   column: '6',
    //   actualValue: '',
    // },
  ]
  return arregloCampos;
}
