import {FormGroup, Validators} from '@angular/forms';
import {FormAsientoContableDetAdicionalEnum} from './form-asiento-contable-det-adicional.enum';
import {fieldType, FormField} from '../../../componentes/forms/interfaces/form-field';


export const FORM_ASIENTO_CONTABLE_DET_ADICIONAL: () => (FormField[]) = () => {
  const arregloCampos: FormField[] = [
    {
      type: fieldType.text,
      label: 'Llave',
      formControlName: FormAsientoContableDetAdicionalEnum.llave,
      placeholder: 'Ej: llave',
      initialValue: "",
      help: 'Ingrese la llave',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        Validators.required,
        Validators.maxLength(255)
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
    },

    {
      type: fieldType.text,
      label: 'Valor',
      formControlName: FormAsientoContableDetAdicionalEnum.valor,
      placeholder: 'Ej: valor',
      initialValue: "",
      help: 'Ingrese el valor',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        Validators.required,
        Validators.maxLength(255)
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
