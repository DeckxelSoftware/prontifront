import {FormGroup, Validators} from '@angular/forms';
import {FormImpuestoRentaEnum} from './form-impuesto-renta.enum';
import {fieldType, FormField} from '../../../componentes/forms/interfaces/form-field';


export const FORM_IMPUESTO_RENTA: () => (FormField[]) = () => {
  const arregloCampos: FormField[] = [
    {
      type: fieldType.text,
      label: 'Nombre',
      formControlName: FormImpuestoRentaEnum.nombre,
      placeholder: 'Ej: Tabla anual...',
      initialValue: "",
      help: 'Ingrese el nombre',
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
    {
      type: fieldType.inputNumber,
      label: 'Año',
      formControlName: FormImpuestoRentaEnum.anio,
      placeholder: 'Ej: 2022',
      initialValue: "",
      help: 'Ingrese el año',
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
        min: 1111,
        max: 9999,
        minFractionDigits: 0,
        maxFractionDigits: 0
      }
    },
    {
      type: fieldType.inputNumber,
      label: 'Fracción básica 1',
      formControlName: FormImpuestoRentaEnum.fraccionBasica1,
      placeholder: 'Ej: 0.00',
      initialValue: "",
      help: 'Ingrese la fracción básica 1',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        Validators.required,
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '4',
      actualValue: '',
      inputNumber: {
        min: 0,
        minFractionDigits: 2,
        maxFractionDigits: 2
      }
    },
    {
      type: fieldType.inputNumber,
      label: 'Impuesto fracción básica 1',
      formControlName: FormImpuestoRentaEnum.impuestoFraccionBasica1,
      placeholder: 'Ej: 0.00',
      initialValue: "",
      help: 'Ingrese el impuesto fracción básica 1',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        Validators.required,
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '4',
      actualValue: '',
      inputNumber: {
        min: 0,
        minFractionDigits: 2,
        maxFractionDigits: 2
      }
    },
    {
      type: fieldType.inputNumber,
      label: 'Impuesto fracción excedente 1',
      formControlName: FormImpuestoRentaEnum.impuestoFraccionExcedente1,
      placeholder: 'Ej: 0.00',
      initialValue: "",
      help: 'Ingrese el impuesto fracción excedente 1',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        Validators.required,
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '4',
      actualValue: '',
      inputNumber: {
        min: 0,
        minFractionDigits: 2,
        maxFractionDigits: 2
      }
    },
    {
      type: fieldType.inputNumber,
      label: 'Fracción básica 2',
      formControlName: FormImpuestoRentaEnum.fraccionBasica2,
      placeholder: 'Ej: 0.00',
      initialValue: "",
      help: 'Ingrese la fracción básica 2',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        Validators.required,
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '4',
      actualValue: '',
      inputNumber: {
        min: 0,
        minFractionDigits: 2,
        maxFractionDigits: 2
      }
    },
    {
      type: fieldType.inputNumber,
      label: 'Impuesto fracción básica 2',
      formControlName: FormImpuestoRentaEnum.impuestoFraccionBasica2,
      placeholder: 'Ej: 0.00',
      initialValue: "",
      help: 'Ingrese el impuesto fracción básica 2',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        Validators.required,
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '4',
      actualValue: '',
      inputNumber: {
        min: 0,
        minFractionDigits: 2,
        maxFractionDigits: 2
      }
    },
    {
      type: fieldType.inputNumber,
      label: 'Impuesto fracción excedente 2',
      formControlName: FormImpuestoRentaEnum.impuestoFraccionExcedente2,
      placeholder: 'Ej: 0.00',
      initialValue: "",
      help: 'Ingrese el impuesto fracción excedente 2',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        Validators.required,
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '4',
      actualValue: '',
      inputNumber: {
        min: 0,
        minFractionDigits: 2,
        maxFractionDigits: 2
      }
    },
    {
      type: fieldType.inputNumber,
      label: 'Fracción básica 3',
      formControlName: FormImpuestoRentaEnum.fraccionBasica3,
      placeholder: 'Ej: 0.00',
      initialValue: "",
      help: 'Ingrese la fracción básica 3',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        Validators.required,
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '4',
      actualValue: '',
      inputNumber: {
        min: 0,
        minFractionDigits: 2,
        maxFractionDigits: 2
      }
    },
    {
      type: fieldType.inputNumber,
      label: 'Impuesto fracción básica 3',
      formControlName: FormImpuestoRentaEnum.impuestoFraccionBasica3,
      placeholder: 'Ej: 0.00',
      initialValue: "",
      help: 'Ingrese el impuesto fracción básica 3',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        Validators.required,
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '4',
      actualValue: '',
      inputNumber: {
        min: 0,
        minFractionDigits: 2,
        maxFractionDigits: 2
      }
    },
    {
      type: fieldType.inputNumber,
      label: 'Impuesto fracción excedente 3',
      formControlName: FormImpuestoRentaEnum.impuestoFraccionExcedente3,
      placeholder: 'Ej: 0.00',
      initialValue: "",
      help: 'Ingrese el impuesto fracción excedente 3',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        Validators.required,
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '4',
      actualValue: '',
      inputNumber: {
        min: 0,
        minFractionDigits: 2,
        maxFractionDigits: 2
      }
    },
    {
      type: fieldType.inputNumber,
      label: 'Fracción básica 4',
      formControlName: FormImpuestoRentaEnum.fraccionBasica4,
      placeholder: 'Ej: 0.00',
      initialValue: "",
      help: 'Ingrese la fracción básica 4',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        Validators.required,
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '4',
      actualValue: '',
      inputNumber: {
        min: 0,
        minFractionDigits: 2,
        maxFractionDigits: 2
      }
    },
    {
      type: fieldType.inputNumber,
      label: 'Impuesto fracción básica 4',
      formControlName: FormImpuestoRentaEnum.impuestoFraccionBasica4,
      placeholder: 'Ej: 0.00',
      initialValue: "",
      help: 'Ingrese el impuesto fracción básica 4',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        Validators.required,
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '4',
      actualValue: '',
      inputNumber: {
        min: 0,
        minFractionDigits: 2,
        maxFractionDigits: 2
      }
    },
    {
      type: fieldType.inputNumber,
      label: 'Impuesto fracción excedente 4',
      formControlName: FormImpuestoRentaEnum.impuestoFraccionExcedente4,
      placeholder: 'Ej: 0.00',
      initialValue: "",
      help: 'Ingrese el impuesto fracción excedente 4',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        Validators.required,
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '4',
      actualValue: '',
      inputNumber: {
        min: 0,
        minFractionDigits: 2,
        maxFractionDigits: 2
      }
    },
    {
      type: fieldType.inputNumber,
      label: 'Fracción básica 5',
      formControlName: FormImpuestoRentaEnum.fraccionBasica5,
      placeholder: 'Ej: 0.00',
      initialValue: "",
      help: 'Ingrese la fracción básica 5',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        Validators.required,
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '4',
      actualValue: '',
      inputNumber: {
        min: 0,
        minFractionDigits: 2,
        maxFractionDigits: 2
      }
    },
    {
      type: fieldType.inputNumber,
      label: 'Impuesto fracción básica 5',
      formControlName: FormImpuestoRentaEnum.impuestoFraccionBasica5,
      placeholder: 'Ej: 0.00',
      initialValue: "",
      help: 'Ingrese el impuesto fracción básica 5',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        Validators.required,
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '4',
      actualValue: '',
      inputNumber: {
        min: 0,
        minFractionDigits: 2,
        maxFractionDigits: 2
      }
    },
    {
      type: fieldType.inputNumber,
      label: 'Impuesto fracción excedente 5',
      formControlName: FormImpuestoRentaEnum.impuestoFraccionExcedente5,
      placeholder: 'Ej: 0.00',
      initialValue: "",
      help: 'Ingrese el impuesto fracción excedente 5',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        Validators.required,
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '4',
      actualValue: '',
      inputNumber: {
        min: 0,
        minFractionDigits: 2,
        maxFractionDigits: 2
      }
    },
    {
      type: fieldType.inputNumber,
      label: 'Fracción básica 6',
      formControlName: FormImpuestoRentaEnum.fraccionBasica6,
      placeholder: 'Ej: 0.00',
      initialValue: "",
      help: 'Ingrese la fracción básica 6',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        Validators.required,
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '4',
      actualValue: '',
      inputNumber: {
        min: 0,
        minFractionDigits: 2,
        maxFractionDigits: 2
      }
    },
    {
      type: fieldType.inputNumber,
      label: 'Impuesto fracción básica 6',
      formControlName: FormImpuestoRentaEnum.impuestoFraccionBasica6,
      placeholder: 'Ej: 0.00',
      initialValue: "",
      help: 'Ingrese el impuesto fracción básica 6',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        Validators.required,
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '4',
      actualValue: '',
      inputNumber: {
        min: 0,
        minFractionDigits: 2,
        maxFractionDigits: 2
      }
    },
    {
      type: fieldType.inputNumber,
      label: 'Impuesto fracción excedente 6',
      formControlName: FormImpuestoRentaEnum.impuestoFraccionExcedente6,
      placeholder: 'Ej: 0.00',
      initialValue: "",
      help: 'Ingrese el impuesto fracción excedente 6',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        Validators.required,
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '4',
      actualValue: '',
      inputNumber: {
        min: 0,
        minFractionDigits: 2,
        maxFractionDigits: 2
      }
    },
    {
      type: fieldType.inputNumber,
      label: 'Fracción básica 7',
      formControlName: FormImpuestoRentaEnum.fraccionBasica7,
      placeholder: 'Ej: 0.00',
      initialValue: "",
      help: 'Ingrese la fracción básica 7',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        Validators.required,
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '4',
      actualValue: '',
      inputNumber: {
        min: 0,
        minFractionDigits: 2,
        maxFractionDigits: 2
      }
    },
    {
      type: fieldType.inputNumber,
      label: 'Impuesto fracción básica 7',
      formControlName: FormImpuestoRentaEnum.impuestoFraccionBasica7,
      placeholder: 'Ej: 0.00',
      initialValue: "",
      help: 'Ingrese el impuesto fracción básica 7',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        Validators.required,
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '4',
      actualValue: '',
      inputNumber: {
        min: 0,
        minFractionDigits: 2,
        maxFractionDigits: 2
      }
    },
    {
      type: fieldType.inputNumber,
      label: 'Impuesto fracción excedente 7',
      formControlName: FormImpuestoRentaEnum.impuestoFraccionExcedente7,
      placeholder: 'Ej: 0.00',
      initialValue: "",
      help: 'Ingrese el impuesto fracción excedente 7',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        Validators.required,
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '4',
      actualValue: '',
      inputNumber: {
        min: 0,
        minFractionDigits: 2,
        maxFractionDigits: 2
      }
    },
    {
      type: fieldType.inputNumber,
      label: 'Fracción básica 8',
      formControlName: FormImpuestoRentaEnum.fraccionBasica8,
      placeholder: 'Ej: 0.00',
      initialValue: "",
      help: 'Ingrese la fracción básica 8',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        Validators.required,
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '4',
      actualValue: '',
      inputNumber: {
        min: 0,
        minFractionDigits: 2,
        maxFractionDigits: 2
      }
    },
    {
      type: fieldType.inputNumber,
      label: 'Impuesto fracción básica 8',
      formControlName: FormImpuestoRentaEnum.impuestoFraccionBasica8,
      placeholder: 'Ej: 0.00',
      initialValue: "",
      help: 'Ingrese el impuesto fracción básica 8',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        Validators.required,
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '4',
      actualValue: '',
      inputNumber: {
        min: 0,
        minFractionDigits: 2,
        maxFractionDigits: 2
      }
    },
    {
      type: fieldType.inputNumber,
      label: 'Impuesto fracción excedente 8',
      formControlName: FormImpuestoRentaEnum.impuestoFraccionExcedente8,
      placeholder: 'Ej: 0.00',
      initialValue: "",
      help: 'Ingrese el impuesto fracción excedente 8',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        Validators.required,
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '4',
      actualValue: '',
      inputNumber: {
        min: 0,
        minFractionDigits: 2,
        maxFractionDigits: 2
      }
    },
    {
      type: fieldType.inputNumber,
      label: 'Fracción básica 9',
      formControlName: FormImpuestoRentaEnum.fraccionBasica9,
      placeholder: 'Ej: 0.00',
      initialValue: "",
      help: 'Ingrese la fracción básica 9',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        Validators.required,
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '4',
      actualValue: '',
      inputNumber: {
        min: 0,
        minFractionDigits: 2,
        maxFractionDigits: 2
      }
    },
    {
      type: fieldType.inputNumber,
      label: 'Impuesto fracción básica 9',
      formControlName: FormImpuestoRentaEnum.impuestoFraccionBasica9,
      placeholder: 'Ej: 0.00',
      initialValue: "",
      help: 'Ingrese el impuesto fracción básica 9',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        Validators.required,
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '4',
      actualValue: '',
      inputNumber: {
        min: 0,
        minFractionDigits: 2,
        maxFractionDigits: 2
      }
    },
    {
      type: fieldType.inputNumber,
      label: 'Impuesto fracción excedente 9',
      formControlName: FormImpuestoRentaEnum.impuestoFraccionExcedente9,
      placeholder: 'Ej: 0.00',
      initialValue: "",
      help: 'Ingrese el impuesto fracción excedente 9',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        Validators.required,
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '4',
      actualValue: '',
      inputNumber: {
        min: 0,
        minFractionDigits: 2,
        maxFractionDigits: 2
      }
    },
    {
      type: fieldType.inputNumber,
      label: 'Fracción básica 10',
      formControlName: FormImpuestoRentaEnum.fraccionBasica10,
      placeholder: 'Ej: 0.00',
      initialValue: "",
      help: 'Ingrese la fracción básica 10',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        Validators.required,
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '4',
      actualValue: '',
      inputNumber: {
        min: 0,
        minFractionDigits: 2,
        maxFractionDigits: 2
      }
    },
    {
      type: fieldType.inputNumber,
      label: 'Impuesto fracción básica 10',
      formControlName: FormImpuestoRentaEnum.impuestoFraccionBasica10,
      placeholder: 'Ej: 0.00',
      initialValue: "",
      help: 'Ingrese el impuesto fracción básica 10',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        Validators.required,
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '4',
      actualValue: '',
      inputNumber: {
        min: 0,
        minFractionDigits: 2,
        maxFractionDigits: 2
      }
    },
    {
      type: fieldType.inputNumber,
      label: 'Impuesto fracción excedente 10',
      formControlName: FormImpuestoRentaEnum.impuestoFraccionExcedente10,
      placeholder: 'Ej: 0.00',
      initialValue: "",
      help: 'Ingrese el impuesto fracción excedente 10',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        Validators.required,
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '4',
      actualValue: '',
      inputNumber: {
        min: 0,
        minFractionDigits: 2,
        maxFractionDigits: 2
      }
    },
  ]
  return arregloCampos;
}
