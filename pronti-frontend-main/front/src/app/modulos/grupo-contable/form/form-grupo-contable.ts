import {FormGroup, Validators} from '@angular/forms';
import {FormGrupoContableEnum} from './form-grupo-contable.enum';
import {fieldType, FormField} from '../../../componentes/forms/interfaces/form-field';


export const FORM_GRUPO_CONTABLE: () => (FormField[]) = () => {
  const arregloCampos: FormField[] = [
    {
      type: fieldType.text,
      label: 'Nombre',
      formControlName: FormGrupoContableEnum.nombre,
      placeholder: 'Ej: Grupo ...',
      initialValue: "",
      help: 'Ingrese el nombre',
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
      type: fieldType.textarea,
      label: 'Descripción',
      formControlName: FormGrupoContableEnum.descripcion,
      placeholder: 'Ej: Grupo para ...',
      initialValue: "",
      help: 'Ingrese una descripción del grupo',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        Validators.required,
        Validators.maxLength(255),
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '12',
      textarea: {
        rows: 2,
      },
      actualValue: '',
    },
  ]
  return arregloCampos;
}
