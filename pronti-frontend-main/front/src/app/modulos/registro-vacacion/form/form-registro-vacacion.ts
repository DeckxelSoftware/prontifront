import {FormGroup, Validators} from '@angular/forms';
import {FormRegistroVacacionEnum} from './form-registro-vacacion.enum';
import {fieldType, FormField} from "../../../componentes/forms/interfaces/form-field";
import {SiNoEnum} from "../../../enums/si-no.enum";
import {REGEX_NUMEROS} from '../../../constantes/form/regex/numeros';


export const FORM_REGISTRO_VACACION: () => (FormField[]) = () => {
  const arregloCampos: FormField[] = [

    {
      label: 'Fecha desde',
      placeholder: 'Ej: mm-dd-yyyy',
      help: 'Ingrese fecha desde',
      formControlName: FormRegistroVacacionEnum.fechaDesde,
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
    {
      label: 'Días tomados',
      placeholder: 'Ej: 2',
      help: 'Ingrese los días tomados',
      formControlName: FormRegistroVacacionEnum.diasTomados,
      initialValue: '',
      validators: [
        Validators.required,
      ],
      inputNumber: {
        min: 1,
      },
      type: fieldType.inputNumber,
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
    },

    {
      label: 'Fecha hasta',
      placeholder: 'Ej: mm-dd-yyyy',
      help: 'Ingrese fecha hasta',
      formControlName: FormRegistroVacacionEnum.fechaHasta,
      initialValue: '',
      disabled: true,
      validators: [
        // Validators.required,
      ],
      type: fieldType.date,
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
    },


    {
      label: 'Valor tomado',
      placeholder: 'Ej: 2',
      help: 'Ingrese el valor tomado',
      formControlName: FormRegistroVacacionEnum.valorTomado,
      initialValue: '',
      disabled: true,
      validators: [
        Validators.required,
      ],
      inputNumber: {
        prefix: '$',
        min: 0,
        minFractionDigits: 2,
        maxFractionDigits: 2
      },
      type: fieldType.inputNumber,
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
    },

    {
      label: 'Esta pagado',
      placeholder: 'Ej: SI/NO/...',
      help: 'Indique si esta pagado o no',
      formControlName: FormRegistroVacacionEnum.estaPagado,
      initialValue: '',
      validators: [
        Validators.required,
      ],
      type: fieldType.select,
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
      select: SELECT_SI_NO
    },
    {
      label: 'Fecha pago',
      placeholder: 'Ej: mm-dd-yyyy',
      help: 'Ingrese fecha pago',
      formControlName: FormRegistroVacacionEnum.fechaPago,
      initialValue: '',
      disabled: true,
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
      label: 'Comprobante pago',
      type: fieldType.text,
      formControlName: FormRegistroVacacionEnum.comprobantePago,
      placeholder: 'Ej: 00125',
      initialValue: "",
      help: 'Ingrese el número de comprobante de pago',
      patternMessage: REGEX_NUMEROS.mensaje,
      disabled: true,
      validators: [
        Validators.required,
        Validators.pattern(REGEX_NUMEROS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
    },
    {
      label: 'Valor pagado',
      placeholder: 'Ej: 2',
      help: 'Ingrese el valor pagado',
      formControlName: FormRegistroVacacionEnum.valorPagado,
      initialValue: '',
      disabled: true,
      validators: [
        // Validators.required,
      ],
      inputNumber: {
        prefix: '$',
        min: 0,
        minFractionDigits: 2,
        maxFractionDigits: 2
      },
      type: fieldType.inputNumber,
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
    }
  ]
  return arregloCampos;
}

export const SELECT_SI_NO = {
  filterBy: 'estaPagado',
  dataKey: 'estaPagado',
  filterPlaceholder: 'SI/NO',
  optionLabel: 'nombre',
  options: [
    {
      estaPagado: SiNoEnum.SI,
      nombre: 'SI',
    },
    {
      estaPagado: SiNoEnum.NO,
      nombre: 'NO',
    },
  ]
};
