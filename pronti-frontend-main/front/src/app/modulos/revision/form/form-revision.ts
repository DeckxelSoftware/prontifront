import {FormGroup, Validators} from '@angular/forms';
import {FormRevisionEnum} from './form-revision.enum';
import {fieldType, FormField} from '../../../componentes/forms/interfaces/form-field';


export const FORM_REVISION: () => (FormField[]) = () => {
  const arregloCampos: FormField[] = [
    {
      type: fieldType.text,
      label: 'Calificación',
      formControlName: FormRevisionEnum.calificacion,
      placeholder: 'Ej: 9',
      initialValue: "",
      help: 'Ingrese la calificación',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        Validators.required,
        Validators.maxLength(255),
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
    },
    {
      type: fieldType.text,
      label: 'Compresión',
      formControlName: FormRevisionEnum.compresionMotor,
      placeholder: 'Ej: 125 psi',
      initialValue: "",
      help: 'Ingrese la compresión del motor',

      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        Validators.required,
        Validators.maxLength(255),
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
    },

    {
      type: fieldType.text,
      label: 'Caja',
      formControlName: FormRevisionEnum.caja,
      placeholder: 'Ej: en buen estado',
      initialValue: "",
      help: 'Ingrese descripción de la caja',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        Validators.required,
        Validators.maxLength(255),
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
    },

    {
      type: fieldType.text,
      label: 'Observaciones',
      formControlName: FormRevisionEnum.observaciones,
      placeholder: 'Ej: vehículo en buen estado',
      initialValue: "",
      help: 'Ingrese la observación del vehículo',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        Validators.required,
        Validators.maxLength(255),
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
    },

    {
      label: 'Fecha firma aprobación',
      placeholder: 'Ej: mm-dd-yyyy',
      help: 'Ingrese una fecha',
      formControlName: FormRevisionEnum.fechaFirmaAprobacion,
      initialValue: '',
      validators: [
        Validators.required,
      ],
      type: fieldType.date,
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
    },
  ]
  return arregloCampos;
}
