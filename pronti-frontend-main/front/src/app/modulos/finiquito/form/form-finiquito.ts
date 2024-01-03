import {FormGroup, Validators} from '@angular/forms';
import {FormFiniquitoEnum} from './form-finiquito.enum';
import {fieldType, FormField} from "../../../componentes/forms/interfaces/form-field";
import {FORM_BENEFICIO_ENUM} from "../../trabajador/form/form-beneficio.enum";
import {SiNoEnum} from "../../../enums/si-no.enum";
import {FormInformacionFinancieraEnum} from "../../informacion-financiera/form/form-informacion-financiera.enum";
import {FormaPagoEnum} from "../../../enums/forma-pago.enum";

export const FORM_FINIQUITO: () => (FormField[]) = () => {
  const arregloCampos: FormField[] = [
    {
      label: 'Trabajador',
      placeholder: 'Ej: Cristian',
      help: 'Seleccione un Trabajador',
      formControlName: FormFiniquitoEnum.idTrabajador,
      initialValue: '',
      validators: [
        Validators.required,
      ],
      type: fieldType.autoComplete,
      formGroup: new FormGroup({}),
      valid: false,
      column: '12',
      actualValue: '',
      autoComplete: {
        field: 'nombreCompleto',
        inputId: 'id',
        suggestions: []
      }
    },
    {
      label: 'Motivo salida',
      placeholder: 'Ej: Renuncia voluntaria',
      help: 'Seleccione el motivo de salida',
      formControlName: FormFiniquitoEnum.motivoSalida,
      initialValue: '',
      validators: [
        Validators.required
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
      label: 'Fecha de salida',
      placeholder: 'Ej: 12/12/2022',
      help: 'Seleccione la fecha de salida',
      formControlName: FormFiniquitoEnum.fechaSalida,
      initialValue: '',
      validators: [
        Validators.required
      ],
      type: fieldType.date,
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
    },
    {
      label: 'Documento identidad',
      placeholder: '',
      help: '',
      formControlName: FormFiniquitoEnum.documentoIdentidad,
      initialValue: '',
      disabled: true,
      validators: [],
      type: fieldType.text,
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
    },
    {
      label: 'Fecha ingreso',
      placeholder: '',
      help: '',
      formControlName: FormFiniquitoEnum.fechaIngreso,
      initialValue: '',
      disabled: true,
      validators: [],
      type: fieldType.text,
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
    },
    {
      label: 'Profesión',
      placeholder: '',
      help: '',
      formControlName: FormFiniquitoEnum.profesion,
      initialValue: '',
      disabled: true,
      validators: [],
      type: fieldType.text,
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
    },
    {
      label: 'Sueldo',
      placeholder: '',
      help: '',
      formControlName: FormFiniquitoEnum.sueldo,
      initialValue: '',
      disabled: true,
      validators: [],
      type: fieldType.inputNumber,
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
      inputNumber: {
        prefix: '$'
      }
    },
    {
      label: 'Fondo reserva IESS',
      placeholder: '',
      help: '',
      formControlName: FormFiniquitoEnum.fondoReservaIess,
      initialValue: '',
      disabled: true,
      validators: [],
      type: fieldType.select,
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
      select: {
        filterBy: 'nombre',
        dataKey: 'fondoReservaIess',
        filterPlaceholder: 'Si/No',
        optionLabel: 'nombre',
        options: [
          {
            fondoReservaIess: '',
            nombre: 'No definido',
          },
          {
            fondoReservaIess: SiNoEnum.SI,
            nombre: 'Si',
          },
          {
            fondoReservaIess: SiNoEnum.NO,
            nombre: 'No',
          }
        ]
      },
    },
    {
      label: 'Forma de pago',
      formControlName: FormFiniquitoEnum.formaPago,
      type: fieldType.select,
      help: '',
      select: {
        filterBy: 'nombre',
        dataKey: 'formaPago',
        filterPlaceholder: 'Transferencia/Cheque',
        optionLabel: 'nombre',
        options: [
          {
            formaPago: '',
            nombre: 'No definido',
          },
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
      disabled: true,
      validators: [],
      formGroup: new FormGroup({}),
      valid: false,
      placeholder: '',
      column: '6',
      actualValue: '',
    },
    {
      label: 'Credencial',
      placeholder: 'EJ: 10',
      help: 'Ingrese el valor',
      formControlName: FormFiniquitoEnum.credencial,
      initialValue: '',
      validators: [
        Validators.required
      ],
      type: fieldType.inputNumber,
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
      inputNumber: {
        prefix: '$',
        maxFractionDigits: 2,
        minFractionDigits: 2
      }
    },
    {
      label: 'Descuento cliente',
      placeholder: 'EJ: 10',
      help: 'Ingrese el valor',
      formControlName: FormFiniquitoEnum.descuentoCliente,
      initialValue: '',
      validators: [
        Validators.required
      ],
      type: fieldType.inputNumber,
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
      inputNumber: {
        prefix: '$',
        maxFractionDigits: 2,
        minFractionDigits: 2
      }
    },
    {
      label: 'Stand',
      placeholder: 'EJ: 10',
      help: 'Ingrese el valor',
      formControlName: FormFiniquitoEnum.stand,
      initialValue: '',
      validators: [
        Validators.required
      ],
      type: fieldType.inputNumber,
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
      inputNumber: {
        prefix: '$',
        maxFractionDigits: 2,
        minFractionDigits: 2
      }
    },

    {
      label: 'Chompa',
      placeholder: 'EJ: 10',
      help: 'Ingrese el valor',
      formControlName: FormFiniquitoEnum.chompa,
      initialValue: '',
      validators: [
        Validators.required
      ],
      type: fieldType.inputNumber,
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
      inputNumber: {
        prefix: '$',
        maxFractionDigits: 2,
        minFractionDigits: 2
      }
    },
    {
      label: 'Clientes desistidos',
      placeholder: 'EJ: 10',
      help: 'Ingrese el valor',
      formControlName: FormFiniquitoEnum.clientesDesistidos,
      initialValue: '',
      validators: [
        Validators.required
      ],
      type: fieldType.inputNumber,
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
      inputNumber: {
        prefix: '$',
        maxFractionDigits: 2,
        minFractionDigits: 2
      }
    },
    {
      label: 'Revisor',
      placeholder: 'EJ: Baneliz Moran',
      help: 'Ingrese el revisor',
      formControlName: FormFiniquitoEnum.revisor,
      initialValue: '',
      validators: [
        Validators.required
      ],
      type: fieldType.text,
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
    },
    {
      label: 'Aprobador',
      placeholder: 'EJ: Adrián Peñaherrera',
      help: 'Ingrese el aprobador',
      formControlName: FormFiniquitoEnum.aprobador,
      initialValue: '',
      validators: [
        Validators.required
      ],
      type: fieldType.text,
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
    },
    // {
    //   type: fieldType.text,
    //   label: 'Nombre',
    //   formControlName: FormFiniquitoEnum.nombre,
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
