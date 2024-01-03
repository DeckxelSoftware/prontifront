import {FormGroup, Validators} from '@angular/forms';
import {FormDetalleNovedadRolPagoEnum} from './form-detalle-novedad-rol-pago.enum';
import {fieldType, FormField} from '../../../componentes/forms/interfaces/form-field';
import {FormRolPagoEnum} from "../../rol-pago/form/form-rol-pago.enum";


export const FORM_DETALLE_NOVEDAD_ROL_PAGO: () => (FormField[]) = () => {
  const arregloCampos: FormField[] = [
    {
      label: 'Usuario',
      placeholder: 'Ej: Cristian',
      help: 'Seleccione un Trabajador',
      formControlName: FormDetalleNovedadRolPagoEnum.idTrabajador,
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
        field: 'nombreCompleto',
        inputId: 'id',
        suggestions: []
      }
    },
    {
      label: 'Periodo laboral',
      placeholder: 'Ej: Ene - 2022',
      help: 'Seleccione un usuario',
      formControlName: FormDetalleNovedadRolPagoEnum.idPeriodoLaboral,
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
        field: 'detalle',
        inputId: 'id',
        suggestions: []
      }
    },
    {
      label: 'Valor',
      placeholder: 'Ej: 10',
      help: 'Ingrese el valor',
      formControlName: FormDetalleNovedadRolPagoEnum.valor,
      initialValue: '',
      validators: [
        Validators.required,
      ],
      type: fieldType.inputNumber,
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
      inputNumber: {
        prefix: '$',
        min: 0,
        minFractionDigits: 2,
        maxFractionDigits: 2
      }
    },
    {
      label: 'Concepto',
      placeholder: 'Ej: Calamidad doméstica',
      help: 'Ingrese el concepto',
      formControlName: FormDetalleNovedadRolPagoEnum.concepto,
      initialValue: '',
      validators: [
        Validators.required,
      ],
      type: fieldType.textarea,
      formGroup: new FormGroup({}),
      valid: false,
      column: '12',
      actualValue: '',
      textarea: {
        rows: 2
      }
    },
  ]
  return arregloCampos;
}
