import {FormGroup, Validators} from '@angular/forms';
import {FormPrecioEnum} from './form-precio.enum';
import {fieldType, FormField} from '../../../componentes/forms/interfaces/form-field';
import {FormContratoEnum} from '../../contrato/form/form-contrato.enum';


export const FORM_PRECIO: () => (FormField[]) = () => {
  const arregloCampos: FormField[] = [
    {
      type: fieldType.number,
      label: 'Precio',
      formControlName: FormPrecioEnum.precio,
      placeholder: 'Ej: 6000',
      initialValue: "",
      help: 'Ingrese un precio',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        Validators.required,
        Validators.min(0),
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      number: {
        min: 0
      },
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
    },
    {
      type: fieldType.number,
      label: 'Cuota del último plazo',
      formControlName: FormPrecioEnum.cuota,
      placeholder: 'Ej: 180',
      initialValue: "",
      help: 'Ingrese el valor de la cuota del último plazo',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        Validators.required,
        Validators.min(0),
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      number: {
        min: 0
      },
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
    },
    {
      type: fieldType.number,
      label: 'Inscripción',
      formControlName: FormPrecioEnum.inscripcion,
      placeholder: 'Ej: 180',
      initialValue: "",
      help: 'Ingrese el valor de la inscripción',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        Validators.required,
        Validators.min(0),
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      number: {
        min: 0
      },
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
    },
    {
      type: fieldType.text,
      label: 'Tasa administrativa',
      formControlName: FormPrecioEnum.tasaAdministrativa,
      placeholder: '',
      initialValue: "",
      help: '',
      disabled:true,
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        //Validators.required,
        // Validators.min(0),
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      number: {
        min: 0
      },
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
    },
    // {
    //   type: fieldType.text,
    //   label: 'Nombre',
    //   formControlName: FormPrecioEnum.nombre,
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
