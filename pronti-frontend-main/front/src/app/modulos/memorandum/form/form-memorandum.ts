import {FormGroup, Validators} from '@angular/forms';
import {FormMemorandumEnum} from './form-memorandum.enum';
import {fieldType, FormField} from '../../../componentes/forms/interfaces/form-field';


export const FORM_MEMORANDUM: () => (FormField[]) = () => {
  const arregloCampos: FormField[] = [
    {
      type: fieldType.date,
      label: 'Fecha',
      formControlName: FormMemorandumEnum.fecha,
      placeholder: 'Ej: 09/06/2022',
      initialValue: "",
      help: 'Seleccione la fecha',
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
      type: fieldType.text,
      label: 'Motivo',
      formControlName: FormMemorandumEnum.motivo,
      placeholder: 'Ej: Por..',
      initialValue: "",
      help: 'Ingrese el motivo',
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
      type: fieldType.text,
      label: 'Observaciones',
      formControlName: FormMemorandumEnum.observaciones,
      placeholder: 'Ej: Por...',
      initialValue: "",
      help: 'Ingrese una observación',
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
    // {
    //   type: fieldType.text,
    //   label: 'Nombre',
    //   formControlName: FormMemorandumEnum.nombre,
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
