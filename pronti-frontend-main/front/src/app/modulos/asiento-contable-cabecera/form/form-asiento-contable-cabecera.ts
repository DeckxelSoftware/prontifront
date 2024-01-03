import {FormGroup, Validators} from '@angular/forms';
import {FormAsientoContableCabeceraEnum} from './form-asiento-contable-cabecera.enum';
import {fieldType, FormField} from '../../../componentes/forms/interfaces/form-field';
import {MesEnum} from '../../../enums/mes.enum';
import {TipoTransaccionEnum} from '../../../enums/tipo-transaccion.enum';
import {TipoAsientoContableEnum} from '../../../enums/tipo-asiento-contable.enum';
import {REGEX_LETRAS_ESPACIOS} from '../../../constantes/form/regex/letras-espacios';
import {REGEX_NUMEROS} from '../../../constantes/form/regex/numeros';
import {SiNoEnum} from '../../../enums/si-no.enum';


export const FORM_ASIENTO_CONTABLE_CABECERA: () => (FormField[]) = () => {
  const arregloCampos: FormField[] = [
    //0
    {
      label: 'Tipo transacción',
      placeholder: 'Ingreso/Egreso/Diario/Transferencia',
      help: 'Seleccione un tipo de transacción',
      formControlName: FormAsientoContableCabeceraEnum.tipoTransaccion,
      initialValue: '',
      validators: [
        Validators.required,
      ],
      type: fieldType.select,
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
      select: SELECT_TIPO_TRANSACCION
    },
    //1
    {
      label: 'Tipo asiento contable',
      placeholder: 'Efectivo/Cheque/Medio Digital/Banco',
      help: 'Seleccione un tipo de asiento contable',
      formControlName: FormAsientoContableCabeceraEnum.tipoAsientoContable,
      initialValue: '',
      validators: [
        Validators.required,
      ],
      type: fieldType.select,
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
      select: SELECT_TIPO_ASIENTO_CONTABLE
    },
    //2
    {
      label: 'Mes periodo',
      placeholder: 'Ej: Enero/Febrero...',
      help: 'Seleccione un mes',
      formControlName: FormAsientoContableCabeceraEnum.mesPeriodo,
      initialValue: '',
      validators: [
        Validators.required,
      ],
      type: fieldType.select,
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
      select: SELECT_MESES
    },
    //3
    {
      label: 'Asiento Cerrado',
      placeholder: 'SI/NO',
      help: 'Seleccione si es asiento cerrado o no',
      formControlName: FormAsientoContableCabeceraEnum.asientoCerrado,
      initialValue: '',
      validators: [
        Validators.required,
      ],
      type: fieldType.select,
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
      select: {
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
      }

    },
    // 4
    {
      label: 'Descripción',
      placeholder: 'Ej: Pago de mercadería',
      help: 'Ingrese la descripción',
      formControlName: FormAsientoContableCabeceraEnum.descripcion,
      initialValue: '',
      validators: [
        Validators.required,
        // Validators.minLength(2),
        Validators.maxLength(255),
      ],
      // patternMessage: REGEX_NUMEROS.mensaje,
      type: fieldType.text,
      formGroup: new FormGroup({}),
      valid: false,
      column: '12',
      actualValue: '',
    },
    //5
    {
      label: 'Año',
      placeholder: 'Ej: 2.23',
      help: 'Ingrese el año',
      formControlName: FormAsientoContableCabeceraEnum.anio,
      initialValue: '',
      validators: [
        Validators.required,
        Validators.min(0)
      ],
      inputNumber: {
        min: 0
      },
      type: fieldType.inputNumber,
      formGroup: new FormGroup({}),
      valid: false,
      column: '4',
      actualValue: '',
    },
    //6
    {
      label: 'Beneficiario',
      placeholder: 'Ej: Beneficiario 1',
      help: 'Ingrese el beneficiario',
      formControlName: FormAsientoContableCabeceraEnum.beneficiario,
      initialValue: '',
      validators: [
        Validators.required,
        // Validators.minLength(2),
        Validators.maxLength(255),
      ],
      // patternMessage: REGEX_NUMEROS.mensaje,
      type: fieldType.text,
      formGroup: new FormGroup({}),
      valid: false,
      column: '8',
      actualValue: '',
    },
    //7
    {
      label: 'Fecha',
      placeholder: 'Ej: mm-dd-yyyy',
      help: 'Ingrese una fecha',
      formControlName: FormAsientoContableCabeceraEnum.fecha,
      initialValue: '',
      validators: [
        // Validators.required,
      ],
      type: fieldType.date,
      formGroup: new FormGroup({}),
      valid: false,
      column: '4',
      actualValue: '',
    },
    //8
    {
      label: 'Total haber',
      placeholder: 'Ej: 2.23',
      help: 'Ingrese el total débito',
      formControlName: FormAsientoContableCabeceraEnum.totalDebito,
      initialValue: '',
      validators: [
        // Validators.required,
        Validators.min(0),
      ],
      inputNumber: {
        mode: 'decimal',
        min: 0,
        prefix: '$',
        maxFractionDigits: 4,
        minFractionDigits: 1,
        step: 0.01,

      },
      type: fieldType.inputNumber,
      formGroup: new FormGroup({}),
      valid: false,
      column: '4',
      actualValue: '',

    },
    // 9
    {
      label: 'Total debe',
      placeholder: 'Ej: 2.23',
      help: 'Ingrese el total crédito',
      formControlName: FormAsientoContableCabeceraEnum.totalCredito,
      initialValue: '',
      validators: [
        // Validators.required,
        Validators.min(0),
      ],
      inputNumber: {
        mode: 'decimal',
        min: 0,
        prefix: '$',
        maxFractionDigits: 4,
        minFractionDigits: 1,
        step: 0.01
      },
      type: fieldType.inputNumber,
      formGroup: new FormGroup({}),
      valid: false,
      column: '4',
      actualValue: '',
    },
    //10
    {
      label: 'Código referencial',
      placeholder: 'Ej: 00010010001001',
      help: 'Ingrese el código referencial',
      formControlName: FormAsientoContableCabeceraEnum.codigoReferenciaAsientoContable,
      initialValue: '',
      validators: [
        // Validators.required,
        Validators.pattern(REGEX_NUMEROS.regex),
        // Validators.minLength(2),
        Validators.maxLength(255),
      ],
      patternMessage: REGEX_NUMEROS.mensaje,
      type: fieldType.text,
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
    },


    /*
        {
          label: 'Total saldo actual fecha',
          placeholder: 'Ej: 12.56',
          help: 'Ingrese el total saldo actual fecha',
          formControlName: FormAsientoContableCabeceraEnum.totalSaldoActualFecha,
          initialValue: '',
          validators: [
            // Validators.required,
            Validators.min(0),
          ],
          inputNumber: {
            mode: 'decimal',
            min: 0,
            prefix: '$',
            maxFractionDigits: 4,
            minFractionDigits: 1
          },
          type: fieldType.inputNumber,
          formGroup: new FormGroup({}),
          valid: false,
          column: '4',
          actualValue: '',
        },
    */


    // {
    //   label: 'Cuenta Contable',
    //   placeholder: 'Ej: Bancos',
    //   help: 'Seleccione una cuenta contable',
    //   formControlName: FormAsientoContableCabeceraEnum.cuentaContable,
    //   initialValue: '',
    //   validators: [
    //     Validators.required,
    //   ],
    //   type: fieldType.autoComplete,
    //   formGroup: new FormGroup({}),
    //   valid: false,
    //   column: '6',
    //   actualValue: '',
    //   autoComplete: {
    //     field: 'nombre',
    //     inputId: 'id',
    //     suggestions: []
    //   }
    // },

    {
      label: 'Cheque',
      placeholder: 'Ej: 10011',
      help: 'Seleccione un cheque',
      formControlName: FormAsientoContableCabeceraEnum.cheque,
      initialValue: '',
      validators: [
        // Validators.required,
      ],
      type: fieldType.autoComplete,
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
      autoComplete: {
        field: 'numeroCheque',
        inputId: 'id',
        suggestions: []
      }
    },
  ]
  return arregloCampos;
}

export const SELECT_MESES = {
  filterBy: 'mesPeriodo',
  dataKey: 'mesPeriodo',
  filterPlaceholder: 'Enero/Febrero',
  optionLabel: 'nombre',
  options: [
    {
      mesPeriodo: MesEnum.Enero,
      nombre: 'Enero',
    },
    {
      mesPeriodo: MesEnum.Febrero,
      nombre: 'Febrero',
    },
    {
      mesPeriodo: MesEnum.Marzo,
      nombre: 'Marzo',
    },
    {
      mesPeriodo: MesEnum.Abril,
      nombre: 'Abril',
    },
    {
      mesPeriodo: MesEnum.Mayo,
      nombre: 'Mayo',
    },
    {
      mesPeriodo: MesEnum.Junio,
      nombre: 'Junio',
    },
    {
      mesPeriodo: MesEnum.Julio,
      nombre: 'Julio',
    },
    {
      mesPeriodo: MesEnum.Agosto,
      nombre: 'Agosto',
    },

    {
      mesPeriodo: MesEnum.Septiembre,
      nombre: 'Septiembre',
    },

    {
      mesPeriodo: MesEnum.Octubre,
      nombre: 'Octubre',
    },

    {
      mesPeriodo: MesEnum.Noviembre,
      nombre: 'Noviembre',
    },
    {
      mesPeriodo: MesEnum.Diciembre,
      nombre: 'Diciembre',
    },
  ]
};


export const SELECT_TIPO_TRANSACCION = {
  filterBy: 'tipoTransaccion',
  dataKey: 'tipoTransaccion',
  filterPlaceholder: 'Ingreso/Egreso/Diario/Transferencia',
  optionLabel: 'nombre',
  options: [
    {
      tipoTransaccion: TipoTransaccionEnum.Ingreso,
      nombre: 'Ingreso',
    },
    {
      tipoTransaccion: TipoTransaccionEnum.Egreso,
      nombre: 'Egreso',
    },

    {
      tipoTransaccion: TipoTransaccionEnum.Diario,
      nombre: 'Diario',
    },

    {
      tipoTransaccion: TipoTransaccionEnum.Transferencia,
      nombre: 'Transferencia',
    },

  ]
}


export const SELECT_TIPO_ASIENTO_CONTABLE = {
  filterBy: 'tipoAsientoContable',
  dataKey: 'tipoAsientoContable',
  filterPlaceholder: 'Efectivo/Cheque/Medio Digital/Banco',
  optionLabel: 'nombre',
  options: [
    {
      tipoAsientoContable: TipoAsientoContableEnum.Efectivo,
      nombre: 'Efectivo',
    },
    {
      tipoAsientoContable: TipoAsientoContableEnum.Cheque,
      nombre: 'Cheque',
    },

    {
      tipoAsientoContable: TipoAsientoContableEnum.MedioDigital,
      nombre: 'Medio Digital',
    },
    {
      tipoAsientoContable: TipoAsientoContableEnum.Banco,
      nombre: 'Banco',
    }
  ]
}
