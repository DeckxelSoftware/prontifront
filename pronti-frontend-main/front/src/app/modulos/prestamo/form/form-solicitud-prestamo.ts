import {fieldType, FormField} from "../../../componentes/forms/interfaces/form-field";
import {FormPrestamoEnum} from "./form-prestamo.enum";
import {FormGroup, Validators} from "@angular/forms";

export const FORM_SOLICITUD_PRESTAMO: () => (FormField[]) = () => {
  const arregloCampos: FormField[] = [
    {
      type: fieldType.autoComplete,
      label: 'Trabajador',
      formControlName: FormPrestamoEnum.idTrabajador,
      placeholder: 'Ej: Cristian Lara',
      initialValue: "",
      help: 'Seleccione el trabajador',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        Validators.required,
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
      autoComplete: {
        field: 'nombreCompleto',
        inputId: 'id',
        suggestions: []
      }
    },
    {
      type: fieldType.autoComplete,
      label: 'Tipo préstamo',
      formControlName: FormPrestamoEnum.tipoPrestamo,
      placeholder: 'Ej: PT.Empresa',
      initialValue: "",
      help: 'Seleccione el tipo de préstamo',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        Validators.required,
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
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

    // {
    //   label: 'Fecha préstamo',
    //   placeholder: 'Ej: mm-dd-yyyy',
    //   help: 'Ingrese una fecha del préstamo',
    //   formControlName: FormPrestamoEnum.fechaPrestamo,
    //   initialValue: '',
    //   validators: [
    //     Validators.required,
    //   ],
    //   type: fieldType.date,
    //   formGroup: new FormGroup({}),
    //   valid: false,
    //   column: '6',
    //   actualValue: '',
    // },

    // {
    //   type: fieldType.text,
    //   label: 'Comprobante egreso',
    //   formControlName: FormPrestamoEnum.comprobanteEgreso,
    //   placeholder: 'Ej: 0003657',
    //   initialValue: "",
    //   help: 'Ingrese el coprobante de egreso',
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

    {
      label: 'Valor',
      placeholder: 'Ej: 100',
      help: 'Ingrese un valor',
      formControlName: FormPrestamoEnum.valor,
      initialValue: '',
      validators: [
        Validators.required,
      ],
      type: fieldType.inputNumber,
      inputNumber: {
        min: 0,
        prefix: '$',
        minFractionDigits: 2,
        maxFractionDigits: 2,
      },
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
    },

    {
      label: 'Cuotas',
      placeholder: 'Ej: 86',
      help: 'Ingrese el valor de cuotas',
      formControlName: FormPrestamoEnum.cuotas,
      initialValue: '',
      validators: [
        Validators.required,
      ],
      type: fieldType.inputNumber,
      inputNumber: {
        min: 0
      },
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
    },

    {
      label: 'Tasa interés',
      placeholder: 'Ej: 86',
      help: 'Ingrese la tasa de interés',
      formControlName: FormPrestamoEnum.tasaInteres,
      initialValue: '',
      validators: [
        Validators.required,
      ],
      type: fieldType.inputNumber,
      inputNumber: {
        min: 0,
        minFractionDigits: 2,
        maxFractionDigits: 2,
        suffix: '%'
      },
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
    },

    {
      type: fieldType.text,
      label: 'Concepto',
      formControlName: FormPrestamoEnum.concepto,
      placeholder: 'Ej: Préstamo para pago de deudas',
      initialValue: "",
      help: 'Ingrese el concepto',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        // Validators.required,
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
    },

    // {
    //   label: 'Estado',
    //   placeholder: 'Ej: Pagado/Pendiente',
    //   help: 'Ingrese el estado',
    //   formControlName: FormPrestamoEnum.estado,
    //   initialValue: '',
    //   validators: [
    //     Validators.required,
    //   ],
    //   type: fieldType.select,
    //   formGroup: new FormGroup({}),
    //   valid: false,
    //   column: '6',
    //   actualValue: '',
    //   select: SELECT_ESTADO_PRESTAMO
    // },

    // {
    //   label: 'Modalidad descuento',
    //   placeholder: 'Ej: Utilidades/Decimo cuarto,tercero/Rol',
    //   help: 'Ingrese la modaliddad de descuento',
    //   formControlName: FormPrestamoEnum.modalidadDescuento,
    //   initialValue: '',
    //   validators: [
    //     Validators.required,
    //   ],
    //   type: fieldType.select,
    //   formGroup: new FormGroup({}),
    //   valid: false,
    //   column: '6',
    //   actualValue: '',
    //   select: SELECT_MODALIDAD_DESCUENTO
    // },
    //
    // {
    //   label: 'Total pagado',
    //   placeholder: 'Ej: 86',
    //   help: 'Ingrese total pagado',
    //   formControlName: FormPrestamoEnum.totalPagado,
    //   initialValue: '',
    //   validators: [
    //     // Validators.required,
    //   ],
    //   type: fieldType.inputNumber,
    //   inputNumber: {
    //     min: 0,
    //     prefix: '$'
    //   },
    //   formGroup: new FormGroup({}),
    //   valid: false,
    //   column: '6',
    //   actualValue: '',
    //
    // },
    //
    // {
    //   label: 'Total saldo',
    //   placeholder: 'Ej: 86',
    //   help: 'Ingrese total saldo',
    //   formControlName: FormPrestamoEnum.totalSaldo,
    //   initialValue: '',
    //   validators: [
    //     Validators.required,
    //   ],
    //   type: fieldType.inputNumber,
    //   inputNumber: {
    //     min: 0,
    //     prefix: '$'
    //   },
    //   formGroup: new FormGroup({}),
    //   valid: false,
    //   column: '6',
    //   actualValue: '',
    // },
  ]
  return arregloCampos;
}

