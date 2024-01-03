import {FormGroup, Validators} from '@angular/forms';
import {fieldType, FormField} from '../../../componentes/forms/interfaces/form-field';
import {REGEX_LETRAS_ESPACIOS} from '../../../constantes/form/regex/letras-espacios';


export const FORM_LOGIN: () => (FormField[]) = () => {
  const arregloCampos: FormField[] = [


    {
      label: 'Usuario',
      placeholder: 'Ej: admin',
      help: 'Ingrese el usuario',
      formControlName: 'usuario',
      initialValue: '',
      validators: [
        Validators.required,
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
        // Validators.minLength(2),
        // Validators.maxLength(6),
      ],
      type: fieldType.text,
      formGroup: new FormGroup({}),
      valid: false,
      column: '12',
      actualValue: '',
    },

   /* {
      label: 'Correo',
      placeholder: 'Ej: mail@domain.com',
      help: 'Ingrese un correo valido',
      formControlName: 'mail',
      initialValue: '',
      validators: [
        Validators.required,
        Validators.email
      ],
      type: fieldType.email,
      formGroup: new FormGroup({}),
      valid: false,
      column: '12',
      actualValue: '',
    },*/
    {
      label: 'Contraseña',
      placeholder: 'Contraseña',
      help: 'Ingrese una contraseña',
      formControlName: 'password',
      initialValue: '',
      validators: [
        Validators.required,
        Validators.minLength(8)
      ],
      type: fieldType.password,
      formGroup: new FormGroup({}),
      valid: false,
      column: '12',
      actualValue: '',
    }
  ]
  return arregloCampos;
}
