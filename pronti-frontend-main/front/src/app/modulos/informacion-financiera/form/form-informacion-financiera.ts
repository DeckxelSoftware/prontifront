import {FormGroup, Validators} from '@angular/forms';
import {FormInformacionFinancieraEnum} from './form-informacion-financiera.enum';
import {fieldType, FormField} from '../../../componentes/forms/interfaces/form-field';
import {FormaPagoEnum} from '../../../enums/forma-pago.enum';
import {REGEX_NUMEROS} from "../../../constantes/form/regex/numeros";

export const FORM_INFORMACION_FINANCIERA: () => (FormField[]) = () => {
  const arregloCampos: FormField[] = [
    {
      label: 'Forma de pago',
      formControlName: FormInformacionFinancieraEnum.formaPago,
      type: fieldType.select,
      help: 'Seleccione la forma de pago',
      select: {
        filterBy: 'nombre',
        dataKey: 'formaPago',
        filterPlaceholder: 'Transferencia/Cheque',
        optionLabel: 'nombre',
        options: [
          {
            formaPago: FormaPagoEnum.transferencia,
            nombre: 'Transferencia',
          },
          {
            formaPago: FormaPagoEnum.cheque,
            nombre: 'Cheque',
          }
        ]
      },
      initialValue: "",
      validators: [
        Validators.required,
      ],
      formGroup: new FormGroup({}),
      valid: false,
      placeholder: 'Ej: Transferencia',
      column: '6',
      actualValue: '',
    },
    {
      label: 'Número de cuenta',
      formControlName: FormInformacionFinancieraEnum.numeroCuenta,
      type: fieldType.text,
      help: 'Ingrese el número de cuenta',
      initialValue: "",
      validators: [
        Validators.required,
        Validators.maxLength(255),
        Validators.minLength(1),
        Validators.pattern(REGEX_NUMEROS.regex)
      ],
      formGroup: new FormGroup({}),
      valid: false,
      placeholder: 'Ej: 2000234532',
      column: '6',
      actualValue: '',
    },
    {
      label: 'Tipo de cuenta',
      placeholder: 'Ej: Ahorros',
      help: 'Seleccione el tipo de cuenta',
      formControlName: FormInformacionFinancieraEnum.tipoCuenta,
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
        inputId: 'nombre',
        suggestions: []
      }
    },
    {
      label: 'Banco',
      placeholder: 'Ej: Banco del ...',
      help: 'Seleccione el banco',
      formControlName: FormInformacionFinancieraEnum.banco,
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
