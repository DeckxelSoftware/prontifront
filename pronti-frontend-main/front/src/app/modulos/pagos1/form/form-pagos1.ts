import {FormGroup, Validators} from '@angular/forms';
import {FormPagos1Enum} from './form-pagos1.enum';
import {fieldType, FormField} from "../../../componentes/forms/interfaces/form-field";


export const FORM_PAGOS_1: () => (FormField[]) = () => {
  const arregloCampos: FormField[] = [
    {
      type: fieldType.text,
      label: 'Region',
      formControlName: FormPagos1Enum.region,
      placeholder: 'Ej: Sierra',
      initialValue: "",
      help: 'Región',
      disabled: true,
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        // Validators.required,
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
    },
    {
      type: fieldType.text,
      label: 'Nombre',
      formControlName: FormPagos1Enum.nombre,
      placeholder: 'Ej: DECIMO CUARTO SUELDO SIERRA',
      initialValue: "",
      help: '',
      disabled: true,
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        // Validators.required,
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
    },
    {
      type: fieldType.text,
      label: 'Fecha inicio',
      formControlName: FormPagos1Enum.fechaInicio,
      placeholder: 'Ej: 01/08/2021',
      initialValue: "",
      help: 'Fecha de inicio',
      disabled: true,
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        // Validators.required,
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
    },
    {
      type: fieldType.text,
      label: 'Fecha fin',
      formControlName: FormPagos1Enum.fechaFin,
      placeholder: 'Ej: 31/07/2022',
      initialValue: "",
      help: 'Fecha de fin',
      disabled: true,
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        // Validators.required,
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
    },
    {
      type: fieldType.text,
      label: 'Último pago',
      formControlName: FormPagos1Enum.ultimoPago,
      placeholder: 'Ej: 30/06/2022',
      initialValue: "",
      help: 'Fecha del último pago',
      disabled: true,
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        // Validators.required,
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
    },
    {
      type: fieldType.text,
      label: 'Período',
      formControlName: FormPagos1Enum.periodo,
      placeholder: 'Ej: 01/08/2021 - 31/07/2022',
      initialValue: "",
      help: 'Período',
      disabled: true,
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        // Validators.required,
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
    },

  ]
  return arregloCampos;
}
