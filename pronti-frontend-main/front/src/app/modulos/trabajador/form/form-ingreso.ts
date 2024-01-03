import {fieldType, FormField} from '../../../componentes/forms/interfaces/form-field';
import {FormGroup, Validators} from '@angular/forms';
import {FORM_INGRESO_ENUM} from './form-ingreso.enum';


export const FORM_INGRESO: () => (FormField[]) = () => {
  const arregloCampos: FormField[] = [
    {
      label: 'Sueldo',
      placeholder: 'Ej: 500',
      help: 'Ingrese el sueldo',
      formControlName: FORM_INGRESO_ENUM.sueldo,
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
      label: 'Bonificación',
      placeholder: 'Ej: 50',
      help: 'Ingrese la bonificación',
      formControlName: FORM_INGRESO_ENUM.bonificacion,
      initialValue: '',
      validators: [
        // Validators.required,
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
      label: 'Movilización especial',
      placeholder: 'Ej: 50',
      help: 'Ingrese el valor de movilización',
      formControlName: FORM_INGRESO_ENUM.movilizacionEspecial,
      initialValue: '',
      validators: [
        // Validators.required,
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
      label: 'Componente salarial unifi.',
      placeholder: 'Ej: 600',
      help: 'Ingrese el componente salarial unificado',
      formControlName: FORM_INGRESO_ENUM.componenteSalarialUnifi,
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

  ]
  return arregloCampos;
}
