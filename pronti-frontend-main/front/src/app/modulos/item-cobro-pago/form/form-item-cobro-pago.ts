import {FormGroup, Validators} from '@angular/forms';
import {FormItemCobroPagoEnum} from './form-item-cobro-pago.enum';
import {fieldType, FormField} from '../../../componentes/forms/interfaces/form-field';


export const FORM_ITEM_COBRO_PAGO: () => (FormField[]) = () => {
  const arregloCampos: FormField[] = [
    {
      type: fieldType.text,
      label: 'Nombre',
      formControlName: FormItemCobroPagoEnum.nombreItem,
      placeholder: 'Ej: Incripción',
      initialValue: "",
      help: 'Ingrese el nombre del ítem',
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
    {
      label: 'Cuenta contable',
      placeholder: 'Ej: Banco',
      help: 'Seleccione una cuenta contable',
      formControlName: FormItemCobroPagoEnum.cuentaContable,
      initialValue: '',
      validators: [
        Validators.required,
      ],
      type: fieldType.autoComplete,
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
      autoComplete:{
        field: 'nombre',
        inputId: 'id',
        suggestions: []
      }
    },
  ]
  return arregloCampos;
}
