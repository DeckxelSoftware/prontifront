import {FormGroup, Validators} from '@angular/forms';
import {FormCuentaBancariaEmpresaEnum} from './form-cuenta-bancaria-empresa.enum';
import {fieldType, FormField} from '../../../componentes/forms/interfaces/form-field';


export const FORM_CUENTA_BANCARIA_EMPRESA: () => (FormField[]) = () => {
  const arregloCampos: FormField[] = [
    {
      type: fieldType.text,
      label: 'Número Cuenta',
      formControlName: FormCuentaBancariaEmpresaEnum.numeroCuenta,
      placeholder: 'Ej: 2222334455',
      initialValue: "",
      help: 'Ingrese el número de cuenta',
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
      label: 'Tipo Cuenta',
      placeholder: 'Ej: Ahorro/Corriente',
      help: 'Seleccione el tipo de cuenta',
      formControlName: FormCuentaBancariaEmpresaEnum.tipoCuenta,
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
        inputId: 'nombre',
        suggestions: []
      }
    },


    {
      label: 'Banco',
      placeholder: 'Ej: Produbanco/Pichincha',
      help: 'Seleccione el banco',
      formControlName: FormCuentaBancariaEmpresaEnum.banco,
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


    {
      label: 'Empresa',
      placeholder: 'Ej: Empresa1',
      help: 'Seleccione la empresa',
      formControlName: FormCuentaBancariaEmpresaEnum.empresa,
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
        field: 'razonSocial',
        inputId: 'id',
        suggestions: []
      }
    },


    // {
    //   type: fieldType.text,
    //   label: 'Nombre',
    //   formControlName: FormCuentaBancariaEmpresaEnum.nombre,
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
