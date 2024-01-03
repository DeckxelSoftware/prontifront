import {FormGroup, Validators} from '@angular/forms';
import {FormAbonoPrestamoEnum} from './form-abono-prestamo.enum';
import {fieldType, FormField} from '../../../componentes/forms/interfaces/form-field';
import {ModalidadDescuentoEnum} from '../../../enums/modalidad-descuento.enum';
import {MesEnum} from '../../../enums/mes.enum';
import {EstadoPagoEnum} from '../../../enums/estado-pago.enum';


export const FORM_ABONO_PRESTAMO: () => (FormField[]) = () => {
  const arregloCampos: FormField[] = [
    {
      type: fieldType.date,
      label: 'Fecha pago',
      formControlName: FormAbonoPrestamoEnum.fechaPago,
      placeholder: 'Ej: 06/06/2022',
      initialValue: "",
      help: 'Seleccione la fecha de pago',
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
      type: fieldType.inputNumber,
      label: 'Número pago',
      formControlName: FormAbonoPrestamoEnum.numeroPago,
      placeholder: 'Ej: 1',
      initialValue: "",
      help: 'Ingrese el número de pago',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        Validators.required,
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
      inputNumber: {
        min: 1,
        prefix: '',
        suffix: ''
      }
    },
    {
      label: 'Modalidad dscto.',
      formControlName: FormAbonoPrestamoEnum.modalidadDescuento,
      type: fieldType.select,
      help: 'Seleccione la modalidad de dscto.',
      select: {
        filterBy: 'nombre',
        dataKey: 'modalidadDescuento',
        filterPlaceholder: 'Ej: Rol',
        optionLabel: 'nombre',
        options: [
          {
            modalidadDescuento: ModalidadDescuentoEnum.rol,
            nombre: 'Rol',
          },
          {
            modalidadDescuento: ModalidadDescuentoEnum.utilidades,
            nombre: 'Utilidades',
          },
          {
            modalidadDescuento: ModalidadDescuentoEnum.decimoTercero,
            nombre: 'Décimo tercero',
          },

          {
            modalidadDescuento: ModalidadDescuentoEnum.decimoCuarto,
            nombre: 'Décimo cuarto',
          },
        ]
      },
      initialValue: "",
      validators: [],
      formGroup: new FormGroup({}),
      valid: false,
      placeholder: 'Ej: Rol',
      column: '6',
      actualValue: '',
    },
    {
      label: 'Mes',
      formControlName: FormAbonoPrestamoEnum.mes,
      type: fieldType.select,
      help: 'Seleccione el mes',
      select: {
        filterBy: 'nombre',
        dataKey: 'mes',
        filterPlaceholder: 'Ej: Enero',
        optionLabel: 'nombre',
        options: [
          {
            mes: MesEnum.Enero,
            nombre: 'Enero',
          },
          {
            mes: MesEnum.Febrero,
            nombre: 'Febrero',
          },
          {
            mes: MesEnum.Marzo,
            nombre: 'Marzo',
          },
          {
            mes: MesEnum.Abril,
            nombre: 'Abril',
          },
          {
            mes: MesEnum.Mayo,
            nombre: 'Mayo',
          },
          {
            mes: MesEnum.Junio,
            nombre: 'Junio',
          },
          {
            mes: MesEnum.Julio,
            nombre: 'Julio',
          },
          {
            mes: MesEnum.Agosto,
            nombre: 'Agosto',
          },
          {
            mes: MesEnum.Septiembre,
            nombre: 'Septiembre',
          },
          {
            mes: MesEnum.Octubre,
            nombre: 'Octubre',
          },
          {
            mes: MesEnum.Noviembre,
            nombre: 'Noviembre',
          },
          {
            mes: MesEnum.Diciembre,
            nombre: 'Diciembre',
          },

        ]
      },
      initialValue: "",
      validators: [],
      formGroup: new FormGroup({}),
      valid: false,
      placeholder: 'Ej: Enero',
      column: '6',
      actualValue: '',
    },
    {
      type: fieldType.inputNumber,
      label: 'Año',
      formControlName: FormAbonoPrestamoEnum.anio,
      placeholder: 'Ej: 2022',
      initialValue: "",
      help: 'Ingrese el año del pago',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        Validators.required,
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
      inputNumber: {
        min: 2000,
        maxFractionDigits: 0,
        minFractionDigits: 0,
        prefix: '',
        suffix: ''
      }
    },
    {
      type: fieldType.inputNumber,
      label: 'Valor cuota',
      formControlName: FormAbonoPrestamoEnum.valorCuota,
      placeholder: 'Ej: $150.00',
      initialValue: "",
      help: 'Ingrese el valor de la cuota',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        Validators.required,
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
      inputNumber: {
        min: 1,
        maxFractionDigits: 2,
        minFractionDigits: 2,
        prefix: '$',
        suffix: ''
      }
    },
    {
      type: fieldType.inputNumber,
      label: 'Valor capital',
      formControlName: FormAbonoPrestamoEnum.valorCapital,
      placeholder: 'Ej: $150.00',
      initialValue: "",
      help: 'Ingrese el valor del capital',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        Validators.required,
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
      inputNumber: {
        min: 1,
        maxFractionDigits: 2,
        minFractionDigits: 2,
        prefix: '$',
        suffix: ''
      }
    },
    {
      type: fieldType.inputNumber,
      label: 'Valor tasa interés',
      formControlName: FormAbonoPrestamoEnum.valorTasaInteres,
      placeholder: 'Ej: $150.00',
      initialValue: "",
      help: 'Ingrese el valor tasa interés',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        Validators.required,
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
      inputNumber: {
        min: 1,
        maxFractionDigits: 2,
        minFractionDigits: 2,
        prefix: '',
        suffix: '%'
      }
    },
    {
      label: 'Está pagado?.',
      formControlName: FormAbonoPrestamoEnum.estaPagado,
      type: fieldType.select,
      help: 'Seleccione si está pagado',
      select: {
        filterBy: 'nombre',
        dataKey: 'estaPagado',
        filterPlaceholder: 'Ej: Cancelado',
        optionLabel: 'nombre',
        options: [
          {
            estaPagado: EstadoPagoEnum.cancelado,
            nombre: 'Cancelado',
          },
          {
            estaPagado: EstadoPagoEnum.pendiente,
            nombre: 'Pendiente',
          },
        ]
      },
      initialValue: "",
      validators: [
        Validators.required
      ],
      formGroup: new FormGroup({}),
      valid: false,
      placeholder: 'Ej: Cancelado',
      column: '6',
      actualValue: '',
    },
  ]
  return arregloCampos;
}
