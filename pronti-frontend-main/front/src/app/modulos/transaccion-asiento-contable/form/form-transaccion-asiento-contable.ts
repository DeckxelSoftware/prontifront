import {FormGroup, Validators} from '@angular/forms';
import {FormTransaccionAsientoContableEnum} from './form-transaccion-asiento-contable.enum';
import {fieldType, FormField} from "../../../componentes/forms/interfaces/form-field";
import {SiNoEnum} from '../../../enums/si-no.enum';
import {REGEX_NUMEROS} from "../../../constantes/form/regex/numeros";


export const FORM_TRANSACCION_ASIENTO_CONTABLE: () => (FormField[]) = () => {
  const arregloCampos: FormField[] = [
    {
      type: fieldType.text,
      label: 'Detalle',
      formControlName: FormTransaccionAsientoContableEnum.detalle,
      placeholder: 'Ej: Detalles',
      initialValue: "",
      help: 'Ingrese el detalle',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        // Validators.required,
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
        Validators.maxLength(255),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
    },

    // {
    //   type: fieldType.text,
    //   label: 'Valor débito',
    //   formControlName: FormTransaccionAsientoContableEnum.detalle,
    //   placeholder: 'Ej: Valor débito',
    //   initialValue: "",
    //   help: 'Ingrese el valor débito',
    //   // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
    //   v
    //   alidators: [
    //     // Validators.required,
    //     // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
    //   ],
    //   formGroup: new FormGroup({}),
    //   valid: false,
    //   column: '6',
    //   actualValue: '',
    // },
    //

    {
      label: 'Haber',
      placeholder: 'Ej: 2.23',
      help: 'Ingrese el valor del crédito',
      formControlName: FormTransaccionAsientoContableEnum.valorCredito,
      initialValue: 0,
      validators: [
        // Validators.required,
      ],
      inputNumber: {
        min: 0,
        prefix: '$',
        maxFractionDigits: 4,
        minFractionDigits: 1
      },
      type: fieldType.inputNumber,
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
    },

    {
      label: 'Debe',
      placeholder: 'Ej: 2.23',
      help: 'Ingrese el valor del débito',
      formControlName: FormTransaccionAsientoContableEnum.valorDebito,
      initialValue: 0,
      validators: [
        // Validators.required,
      ],
      inputNumber: {
        min: 0,
        prefix: '$',
        maxFractionDigits: 4,
        minFractionDigits: 1,
      },
      type: fieldType.inputNumber,
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
    },


    {
      type: fieldType.text,
      label: '# Factura',
      formControlName: FormTransaccionAsientoContableEnum.numeroFactura,
      placeholder: 'Ej: 124',
      initialValue: "",
      help: 'Ingrese el número de factura',
      patternMessage: REGEX_NUMEROS.mensaje,
      validators: [
        // Validators.required,
        Validators.pattern(REGEX_NUMEROS.regex),
        Validators.maxLength(255),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
    },

    // {
    //   label: 'Asiento cerrado',
    //   placeholder: 'Ej: SI/NO',
    //   help: 'Seleccione si el asiento esta cerrado',
    //   formControlName: FormTransaccionAsientoContableEnum.asientoCerrado,
    //   initialValue: '',
    //   validators: [
    //     Validators.required,
    //   ],
    //   type: fieldType.select,
    //   formGroup: new FormGroup({}),
    //   valid: false,
    //   column: '6',
    //   actualValue: '',
    //   select: SELECT_ASIENTO_CERRAADO
    // },

    {
      label: 'Cuenta contable',
      placeholder: 'Ej: ...',
      help: 'Seleccione una cuenta contable',
      formControlName: FormTransaccionAsientoContableEnum.idCuentaContable,
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

/*export const SELECT_ASIENTO_CERRAADO = {
  filterBy: 'asientoCerrado',
  dataKey: 'asientoCerrado',
  filterPlaceholder: 'SI/NO',
  optionLabel: 'nombre',
  options: [
    {
      asientoCerrado: SiNoEnum.SI,
      nombre: 'SI',
    },
    {
      asientoCerrado: SiNoEnum.NO,
      nombre: 'NO',
    },
  ]
};*/
