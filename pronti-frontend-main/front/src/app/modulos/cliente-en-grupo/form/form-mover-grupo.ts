import {FormGroup, Validators} from '@angular/forms';
import {FormClienteEnGrupoEnum} from './form-cliente-en-grupo.enum';
import {fieldType, FormField} from '../../../componentes/forms/interfaces/form-field';


export const FORM_MOVER_GRUPO: () => (FormField[]) = () => {
  const arregloCampos: FormField[] = [

    {
      label: 'Grupo',
      placeholder: 'Ej: 1',
      help: 'Seleccione un grupo',
      formControlName: FormClienteEnGrupoEnum.idGrupo,
      initialValue: '',
      validators: [
        Validators.required,
      ],
      type: fieldType.autoComplete,
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
      autoComplete:{
        field: 'detalleGrupo',
        inputId: 'id',
        suggestions: []
      }
    },
    // {
    //   type: fieldType.text,
    //   label: 'Nombre',
    //   formControlName: FormClienteEnGrupoEnum.nombre,
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
