import {FormGroup, Validators} from '@angular/forms';
import {FormDivisionAdministrativaEnum} from './form-division-administrativa.enum';
import {fieldType, FormField} from '../../../componentes/forms/interfaces/form-field';


export const FORM_DIVISION_ADMINISTRATIVA: () => (FormField[]) = () => {
  const arregloCampos: FormField[] = [
    {
      type: fieldType.text,
      label: 'Nombre',
      formControlName: FormDivisionAdministrativaEnum.nombre,
      placeholder: 'Ej: Bodega',
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
