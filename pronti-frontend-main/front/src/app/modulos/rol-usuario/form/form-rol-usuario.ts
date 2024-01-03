import {FormGroup, Validators} from '@angular/forms';
import {FormRolUsuarioEnum} from './form-rol-usuario.enum';
import {fieldType, FormField} from '../../../componentes/forms/interfaces/form-field';


export const FORM_ROL_USUARIO: () => (FormField[]) = () => {
  const arregloCampos: FormField[] = [
    {
      label: 'Rol',
      placeholder: 'Ej: Administrador',
      help: 'Seleccione un rol',
      formControlName: FormRolUsuarioEnum.rol,
      initialValue: '',
      validators: [
        Validators.required,
      ],
      type: fieldType.autoComplete,
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
      autoComplete: {
        field: 'nombre',
        inputId: 'id',
        suggestions: []
      }
    },
  ]
  return arregloCampos;
}
