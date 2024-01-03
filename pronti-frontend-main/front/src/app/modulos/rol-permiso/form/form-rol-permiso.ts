import {FormGroup, Validators} from '@angular/forms';
import {FormRolPermisoEnum} from './form-rol-permiso.enum';
import {fieldType, FormField} from '../../../componentes/forms/interfaces/form-field';


export const FORM_ROL_PERMISO: () => (FormField[]) = () => {
  const arregloCampos: FormField[] = [
    {
      type: fieldType.autoComplete,
      label: 'Permiso',
      formControlName: FormRolPermisoEnum.permiso,
      placeholder: 'Ej: Crear/Editar/Deshabilitar',
      autoComplete: {
        field: 'nombre',
        inputId: 'id',
        suggestions: []
      },
      initialValue: "",
      help: 'Seleccione un permiso',
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
  ]
  return arregloCampos;
}
