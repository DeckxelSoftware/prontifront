import {FormGroup, Validators} from '@angular/forms';
import {fieldType, FormField} from '../../../componentes/forms/interfaces/form-field';


export const FORM_RESET_PASSWORD: () => (FormField[]) = () => {
  const arregloCampos: FormField[] = [


    {
      label: 'Correo',
      placeholder: 'Ej: mail@domain.com',
      help: 'Ingrese un correo válido',
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
    }
  ]
  return arregloCampos;
}
