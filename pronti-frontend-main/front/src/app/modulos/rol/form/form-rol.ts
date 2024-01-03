import {FormGroup, Validators} from '@angular/forms';
import {FormRolEnum} from './form-rol.enum';
import {fieldType, FormField} from '../../../componentes/forms/interfaces/form-field';
import {REGEX_LETRAS_ESPACIOS} from '../../../constantes/form/regex/letras-espacios';


export const FORM_ROL: () => (FormField[]) = () => {
  const arregloCampos: FormField[] = [
    {
      type: fieldType.text,
      label: 'Nombre',
      formControlName: FormRolEnum.nombre,
      placeholder: 'Ej: admin',
      initialValue: "",
      help: 'Ingrese el nombre',
      patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        Validators.required,
        Validators.maxLength(50),
        Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '12',
      actualValue: '',
    },
  ]
  return arregloCampos;
}
