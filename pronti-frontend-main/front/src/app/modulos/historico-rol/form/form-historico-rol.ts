import {FormGroup, Validators} from '@angular/forms';
import {FormHistoricoRolEnum} from './form-historico-rol.enum';
import { FormField } from '../../../componentes/forms/interfaces/form-field';


export const FORM_HISTORICO_ROL: () => (FormField[]) = () => {
  const arregloCampos: FormField[] = [
    // {
    //   type: fieldType.text,
    //   label: 'Nombre',
    //   formControlName: FormHistoricoRolEnum.nombre,
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
