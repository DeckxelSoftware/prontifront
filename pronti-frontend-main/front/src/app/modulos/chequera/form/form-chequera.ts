import {FormGroup, Validators} from '@angular/forms';
import {FormChequeraEnum} from './form-chequera.enum';
import {fieldType, FormField} from '../../../componentes/forms/interfaces/form-field';
import {FormTrabajadorEnum} from '../../trabajador/form/form-trabajador.enum';


export const FORM_CHEQUERA: () => (FormField[]) = () => {
  const arregloCampos: FormField[] = [
    {
      label: 'Cuenta bancaria',
      placeholder: 'Ej: Cristian',
      help: 'Seleccione el número de cuenta',
      formControlName: FormChequeraEnum.cuentaBancariaEmpresa,
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
        field: 'numeroCuenta',
        inputId: 'id',
        suggestions: []
      }
    },
    {
      type: fieldType.date,
      label: 'Fecha emisión',
      formControlName: FormChequeraEnum.fechaEmision,
      placeholder: 'Ej: 18/05/2022',
      initialValue: "",
      help: 'Seleccione la fecha de emisión',
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
      type: fieldType.number,
      label: 'Número de serie inicio',
      formControlName: FormChequeraEnum.serieDesde,
      placeholder: 'Ej: 1000',
      initialValue: "",
      help: 'Ingreser el número de serie en que incia',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        Validators.required,
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
      number: {
        min: 0
      }
    },
    {
      type: fieldType.number,
      label: 'Número de serie fin',
      formControlName: FormChequeraEnum.serieHasta,
      placeholder: 'Ej: 2000',
      initialValue: "",
      help: 'Ingreser el número de serie en que termina',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        Validators.required,
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
      number: {
        min: 0
      }
    },
  ]
  return arregloCampos;
}
