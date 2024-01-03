import {FormGroup, Validators} from '@angular/forms';
import {FormSupervisorEnum} from './form-supervisor.enum';
import {fieldType, FormField} from '../../../componentes/forms/interfaces/form-field';


export const FORM_SUPERVISOR: () => (FormField[]) = () => {
  const arregloCampos: FormField[] = [
    {
      label: 'Trabajador',
      placeholder: 'Ej: Cristian',
      help: 'Seleccione un Trabajador',
      formControlName: FormSupervisorEnum.trabajador,
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
      label: 'Agencia',
      placeholder: 'Ej: Agencia norte',
      help: 'Seleccione una agencia',
      formControlName: FormSupervisorEnum.agencia,
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
        inputId: 'id',
        suggestions: []
      }
    },
  ]
  return arregloCampos;
}
