import {FormGroup, Validators} from '@angular/forms';
import {FormAgenciaEnum} from './form-agencia.enum';
import {fieldType, FormField} from '../../../componentes/forms/interfaces/form-field';


export const FORM_AGENCIA: () => (FormField[]) = () => {
  const arregloCampos: FormField[] = [
    {
      type: fieldType.text,
      label: 'Nombre',
      formControlName: FormAgenciaEnum.nombre,
      placeholder: 'Ej: Agencia ...',
      initialValue: "",
      help: 'Ingrese el nombre',
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
    {
      type: fieldType.text,
      label: 'Dirección',
      formControlName: FormAgenciaEnum.direccion,
      placeholder: 'Ej: Av. América y ...',
      initialValue: "",
      help: 'Ingrese la dirección de la agencia',
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
    {
      label: 'Ciudad',
      placeholder: 'Ej: Quito/Guayaquil/...',
      help: 'Seleccione una ciudad',
      formControlName: FormAgenciaEnum.ciudad,
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

  ]
  return arregloCampos;
}
