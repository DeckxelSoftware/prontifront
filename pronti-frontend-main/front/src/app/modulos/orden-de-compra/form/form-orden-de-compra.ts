import { FormGroup, Validators } from '@angular/forms';
import { FormOrdenDeCompraEnum } from './form-orden-de-compra.enum';
import { fieldType, FormField } from '../../../componentes/forms/interfaces/form-field';
import { FormArticuloEnum } from '../../articulo/form/form-articulo.enum';


export const FORM_ORDEN_DE_COMPRA: () => (FormField[]) = () => {
  const arregloCampos: FormField[] = [
    {
      label: 'Contrato',
      placeholder: 'Ej: ...',
      help: 'Seleccione un contrato',
      formControlName: FormOrdenDeCompraEnum.idContrato,
      initialValue: '',
      validators: [
        Validators.required,
      ],
      type: fieldType.autoComplete,
      formGroup: new FormGroup({}),
      valid: false,
      column: '4',
      actualValue: '',
      autoComplete: {
        field: 'numeroDeContrato',
        inputId: 'id',
        suggestions: []
      }
    },
    {
      label: 'Proveedor',
      placeholder: 'Ej: ...',
      help: 'Seleccione un proveedor',
      formControlName: FormOrdenDeCompraEnum.idProveedor,
      initialValue: '',
      validators: [
        Validators.required,
      ],
      type: fieldType.autoComplete,
      formGroup: new FormGroup({}),
      valid: false,
      column: '8',
      actualValue: '',
      autoComplete: {
        field: 'nombres',
        inputId: 'id',
        suggestions: []
      }
    },
    {
      type: fieldType.text,
      label: 'Numero de orden contrato',
      formControlName: FormOrdenDeCompraEnum.numeroOrdenContrato,
      placeholder: 'Ej: 1205',
      initialValue: "",
      help: 'Ingrese el número de orden contrato',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        Validators.required,
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      disabled: true,
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
    },

    {
      label: 'Fecha inicio',
      placeholder: 'Ej: mm-dd-yyyy',
      help: 'Ingrese una fecha inicio',
      formControlName: FormOrdenDeCompraEnum.fechaInicio,
      initialValue: '',
      validators: [
        Validators.required,
      ],
      disabled: true,
      type: fieldType.date,
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',

    },

    {
      label: 'Fecha carta oferta',
      placeholder: 'Ej: mm-dd-yyyy',
      help: 'Ingrese una fecha carta oferta',
      formControlName: FormOrdenDeCompraEnum.fechaCartaOferta,
      initialValue: '',
      validators: [
        Validators.required,
      ],
      disabled: true,
      type: fieldType.date,
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
    },




    // INFORMACION DEL CLIENTE


    {
      type: fieldType.text,
      label: 'Cliente',
      formControlName: FormOrdenDeCompraEnum.nombreCliente,
      placeholder: 'Ej: Adrian',
      initialValue: "",
      help: 'Ingrese el nombre del cliente',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        Validators.required,
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      disabled: true,
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
    },
    {
      type: fieldType.text,
      label: 'Tipo documento identidad',
      formControlName: FormOrdenDeCompraEnum.tipoDocumentoIdentidad,
      placeholder: 'Ej: cédula',
      initialValue: "",
      help: 'Ingrese el tipo de documento de identidad',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        Validators.required,
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      disabled: true,
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
    },
    {
      type: fieldType.text,
      label: 'Documento identidad',
      formControlName: FormOrdenDeCompraEnum.documentoIdentidad,
      placeholder: 'Ej: 17XXXX',
      initialValue: "",
      help: 'Ingrese el documento de identidad',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        Validators.required,
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      disabled: true,
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
    },
    {
      type: fieldType.text,
      label: 'Teléfono',
      formControlName: FormOrdenDeCompraEnum.telefono,
      placeholder: 'Ej: 09XXXXX',
      initialValue: "",
      help: 'Ingrese el número de teléfono',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        Validators.required,
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      disabled: true,
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
    },

    {
      type: fieldType.text,
      label: 'Correo',
      formControlName: FormOrdenDeCompraEnum.correo,
      placeholder: 'Ej: pronti@pronti-auto.com',
      initialValue: "",
      help: 'Ingrese el correo',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        Validators.required,
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      disabled: true,
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
    },

    // oferta

    {
      label: 'Fecha registro oferta',
      placeholder: 'Ej: mm-dd-yyyy',
      help: 'Ingrese una fecha registro oferta',
      formControlName: FormOrdenDeCompraEnum.fechaRegistroOferta,
      initialValue: '',
      validators: [
        Validators.required,
      ],
      type: fieldType.date,
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
    },





    /// AUTO MOTOR
    {
      type: fieldType.text,
      label: 'Chasis',
      formControlName: FormOrdenDeCompraEnum.chasis,
      placeholder: 'Ej: 1HGB41JSKC',
      initialValue: "",
      help: 'Ingrese el chasis',
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
      label: 'Modelo',
      placeholder: 'Ej: Versa',
      help: 'Seleccione un modelo',
      formControlName: FormOrdenDeCompraEnum.modelo,
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
      label: 'Marca',
      placeholder: 'Ej: NISSAN',
      help: 'Seleccione una marca',
      formControlName: FormArticuloEnum.marca,
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
      type: fieldType.text,
      label: 'Placa',
      formControlName: FormOrdenDeCompraEnum.placa,
      placeholder: 'Ej: XXX',
      initialValue: "",
      help: 'Ingrese la placa',
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
      label: 'Color',
      placeholder: 'Ej: Rojo',
      help: 'Seleccione un color',
      formControlName: FormOrdenDeCompraEnum.color,
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
      label: 'Año',
      placeholder: 'Ej: 2022',
      help: 'Ingrese el año',
      formControlName: FormOrdenDeCompraEnum.anio,
      initialValue: '',
      validators: [
        Validators.required,
        Validators.max(2100),
        Validators.min(1980)
      ],
      type: fieldType.inputNumber,
      inputNumber: {
        min: 1980,
        max: 2100
      },
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
    },

    {
      type: fieldType.text,
      label: 'motor',
      formControlName: FormOrdenDeCompraEnum.motor,
      placeholder: 'Ej: XXX',
      initialValue: "",
      help: 'Ingrese el motor',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        Validators.required,
        Validators.maxLength(255),
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
    },
    {
      type: fieldType.text,
      label: 'Tipo vehículo',
      formControlName: FormOrdenDeCompraEnum.tipoVehiculo,
      placeholder: 'Ej: usado',
      initialValue: "",
      help: 'Ingrese el tipo de vehículo',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        Validators.required,
        Validators.maxLength(255),
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
    },

    {
      label: 'Valor sin IVA',
      placeholder: 'Ej: $14,500',
      help: 'Ingrese el valor sin IVA',
      formControlName: FormOrdenDeCompraEnum.valorSinIva,
      initialValue: '',
      validators: [
        Validators.required,
      ],
      type: fieldType.inputNumber,
      inputNumber: {
        min: 0,
        prefix: '$'
      },
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
    },

    {
      label: 'Valor total',
      placeholder: 'Ej: $15,000',
      help: 'Ingrese el valor total',
      formControlName: FormOrdenDeCompraEnum.valorTotal,
      initialValue: '',
      validators: [
        Validators.required,
      ],
      type: fieldType.inputNumber,
      inputNumber: {
        min: 0,
        prefix: '$'
      },
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
    },

    {
      type: fieldType.text,
      label: 'Observación',
      formControlName: FormOrdenDeCompraEnum.observacion,
      placeholder: 'Ej: ninguna',
      initialValue: "",
      help: 'Ingrese la observación',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        Validators.required,
        Validators.maxLength(255),
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',

    },

    {
      type: fieldType.text,
      label: 'Beneficiario cheque',
      formControlName: FormOrdenDeCompraEnum.beneficiarioCheque,
      placeholder: 'Ej: Cesar Salazar',
      initialValue: "",
      help: 'Ingrese el beneficiario cheque',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        Validators.required,
        Validators.maxLength(255),

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
