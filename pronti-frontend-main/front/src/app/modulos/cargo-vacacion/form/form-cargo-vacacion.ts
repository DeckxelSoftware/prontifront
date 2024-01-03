import {FormGroup, Validators} from '@angular/forms';
import {FormCargoVacacionEnum} from './form-cargo-vacacion.enum';
import {fieldType, FormField} from '../../../componentes/forms/interfaces/form-field';


export const FORM_CARGO_VACACION: () => (FormField[]) = () => {
  const arregloCampos: FormField[] = [
    {
      type: fieldType.date,
      label: 'Fecha desde',
      formControlName: FormCargoVacacionEnum.fechaDesde,
      placeholder: 'Ej: 22/05/2022',
      initialValue: "",
      help: 'Ingrese La fecha desde',
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
      type: fieldType.date,
      label: 'Fecha hasta',
      formControlName: FormCargoVacacionEnum.fechaHasta,
      placeholder: 'Ej: 21/05/2023',
      initialValue: "",
      help: 'Ingrese La fecha hasta',
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
      label: 'Total ingresos al año',
      formControlName: FormCargoVacacionEnum.totalIngresosAnio,
      placeholder: 'Ej: 12000',
      initialValue: "",
      help: 'Ingrese el total de ingresos al año',
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
        prefix:'$',
        min: 0,
        minFractionDigits: 2,
        maxFractionDigits: 2,
      }
    },

    {
      type: fieldType.inputNumber,
      label: 'Dias tomados',
      formControlName: FormCargoVacacionEnum.diasTomados,
      placeholder: 'Ej: 15',
      initialValue: "",
      help: 'Ingrese los días tomados',
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
        min: 0,
        minFractionDigits: 0,
        maxFractionDigits: 0,
      }
    },
    {
      type: fieldType.inputNumber,
      label: 'Dias antiguedad',
      formControlName: FormCargoVacacionEnum.diasAntiguedad,
      placeholder: 'Ej: 15',
      initialValue: "",
      help: 'Ingrese los días de antiguedad',
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
        min: 0,
        minFractionDigits: 0,
        maxFractionDigits: 0,
      }
    },

    {
      type: fieldType.inputNumber,
      label: 'Dias vacaciones',
      formControlName: FormCargoVacacionEnum.diasVacaciones,
      placeholder: 'Ej: 15',
      initialValue: "",
      help: 'Ingrese los días de vacaciones',
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
        min: 0,
        minFractionDigits: 0,
        maxFractionDigits: 0,
      }
    },
    {
      type: fieldType.inputNumber,
      label: 'Dias teóricos',
      formControlName: FormCargoVacacionEnum.diasTeoricos,
      placeholder: 'Ej: 15',
      initialValue: "",
      help: 'Ingrese los días teóricos',
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
        min: 0,
        minFractionDigits: 0,
        maxFractionDigits: 0,
      }
    },

    {
      type: fieldType.inputNumber,
      label: 'Dias saldo',
      formControlName: FormCargoVacacionEnum.diasSaldo,
      placeholder: 'Ej: 15',
      initialValue: "",
      help: 'Ingrese los días de saldo',
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
        min: 0,
        minFractionDigits: 0,
        maxFractionDigits: 0,
      }
    },
    {
      type: fieldType.inputNumber,
      label: 'Valor vacaciones',
      formControlName: FormCargoVacacionEnum.valorVacaciones,
      placeholder: 'Ej: 500',
      initialValue: "",
      help: 'Ingrese el valor de las vacaciones',
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
        prefix:'$',
        min: 0,
        minFractionDigits: 2,
        maxFractionDigits: 2,
      }
    },
    {
      type: fieldType.inputNumber,
      label: 'Valor días',
      formControlName: FormCargoVacacionEnum.valorDias,
      placeholder: 'Ej: 33.33',
      initialValue: "",
      help: 'Ingrese el valor del día',
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
        prefix:'$',
        min: 0,
        minFractionDigits: 2,
        maxFractionDigits: 2,
      }
    },
    {
      type: fieldType.inputNumber,
      label: 'Valor antiguedad',
      formControlName: FormCargoVacacionEnum.valorAntiguedad,
      placeholder: 'Ej: 33.33',
      initialValue: "",
      help: 'Ingrese el valor antiguedad',
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
        prefix:'$',
        min: 0,
        minFractionDigits: 2,
        maxFractionDigits: 2,
      }
    },
    {
      type: fieldType.inputNumber,
      label: 'Valor teórico',
      formControlName: FormCargoVacacionEnum.valorTeorico,
      placeholder: 'Ej: 33.33',
      initialValue: "",
      help: 'Ingrese el valor teórico',
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
        prefix:'$',
        min: 0,
        minFractionDigits: 2,
        maxFractionDigits: 2,
      }
    },
    {
      type: fieldType.inputNumber,
      label: 'Valor tomado',
      formControlName: FormCargoVacacionEnum.valorTomado,
      placeholder: 'Ej: 33.33',
      initialValue: "",
      help: 'Ingrese el valor tomado',
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
        prefix:'$',
        min: 0,
        minFractionDigits: 2,
        maxFractionDigits: 2,
      }
    },
    {
      type: fieldType.inputNumber,
      label: 'Valor saldo',
      formControlName: FormCargoVacacionEnum.valorSaldo,
      placeholder: 'Ej: 33.33',
      initialValue: "",
      help: 'Ingrese el valor saldo',
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
        prefix:'$',
        min: 0,
        minFractionDigits: 2,
        maxFractionDigits: 2,
      }
    },
    {
      type: fieldType.inputNumber,
      label: 'Número de años acumulados',
      formControlName: FormCargoVacacionEnum.numAnioAcumulado,
      placeholder: 'Ej: 1',
      initialValue: "",
      help: 'Ingrese la cantidad de años acumulados',
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
        min: 0,
        minFractionDigits: 0,
        maxFractionDigits: 0,
      }
    },
    // {
    //   type: fieldType.text,
    //   label: 'Nombre',
    //   formControlName: FormCargoVacacionEnum.nombre,
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
