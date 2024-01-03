import {FormGroup, Validators} from '@angular/forms';
import {FormVendedorEnum} from './form-vendedor.enum';
import {fieldType, FormField} from '../../../componentes/forms/interfaces/form-field';


export const FORM_VENDEDOR: () => (FormField[]) = () => {
  const arregloCampos: FormField[] = [
    {
      label: 'Asesor/Trabajador',
      placeholder: 'Ej: Cristian',
      help: 'Seleccione un Trabajador',
      formControlName: FormVendedorEnum.trabajador,
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
      label: 'Asesor/Proveedor',
      placeholder: 'Ej: Cristian',
      help: 'Seleccione un ',
      formControlName: FormVendedorEnum.proveedor,
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
      formControlName: FormVendedorEnum.agencia,
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
