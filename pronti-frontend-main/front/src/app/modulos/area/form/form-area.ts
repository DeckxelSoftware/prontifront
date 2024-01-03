import {FormGroup, Validators} from '@angular/forms';
import {FormAreaEnum} from './form-area.enum';
import {fieldType, FormField} from '../../../componentes/forms/interfaces/form-field';


export const FORM_AREA: () => (FormField[]) = () => {
  const arregloCampos: FormField[] = [
    {
      type: fieldType.text,
      label: 'Nombre',
      formControlName: FormAreaEnum.nombre,
      placeholder: 'Ej: Comercial',
      initialValue: "",
      help: 'Ingrese el nombre',
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
