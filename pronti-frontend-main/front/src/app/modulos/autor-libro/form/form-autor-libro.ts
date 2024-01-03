import {FormGroup, Validators} from '@angular/forms';
import {FormAutorLibroEnum} from './form-autor-libro.enum';
import {fieldType, FormField, TipoArchivo} from '../../../componentes/forms/interfaces/form-field';
import {REGEX_LETRAS_ESPACIOS} from '../../../constantes/form/regex/letras-espacios';


export const FORM_AUTOR_LIBRO: () => (FormField[]) = () => {
  const arregloCampos: FormField[] = [
    {
      type: fieldType.text,
      label: 'Nombres',
      formControlName: FormAutorLibroEnum.nombres,
      placeholder: 'Ej: Ana Liceth',
      initialValue: "",
      help: 'Ingrese los nombres del autor',
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
      type: fieldType.text,
      label: 'Apellidos',
      formControlName: FormAutorLibroEnum.apellidos,
      placeholder: 'Ej: Ruales Castro',
      initialValue: "",
      help: 'Ingrese los apellidos del autor',
      patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
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
      type: fieldType.textarea,
      label: 'Biografía',
      formControlName: FormAutorLibroEnum.biografia,
      placeholder: 'Ej: Nació en',
      initialValue: '',
      help: 'Ingrese la biografía del autor',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        // Validators.required,
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
        Validators.maxLength(255)
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '12',
      actualValue: '',
      textarea: {
        rows: 2,
      },
    },
  /*  {
      label: 'Biografía',
      placeholder: 'Ej: Biografía ',
      help: 'Selecciona un archivo',
      formControlName: 'biografia',
      initialValue: '',
      validators: [
        Validators.required,
      ],
      type: fieldType.file,
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
      file: {
        tamanioMaximoEnBytes: 1000000 * 10,
        accept: '',
        typo: TipoArchivo.Archivo
      }
    },*/
    // {
    //   type: fieldType.text,
    //   label: 'Nombre',
    //   formControlName: FormAutorLibroEnum.nombre,
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
