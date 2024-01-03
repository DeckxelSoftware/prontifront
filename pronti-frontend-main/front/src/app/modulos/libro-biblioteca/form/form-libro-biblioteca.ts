import {FormGroup, Validators} from '@angular/forms';
import {FormLibroBibliotecaEnum} from './form-libro-biblioteca.enum';
import {fieldType, FormField} from '../../../componentes/forms/interfaces/form-field';
import {REGEX_LETRAS_ESPACIOS} from '../../../constantes/form/regex/letras-espacios';

export const FORM_LIBRO_BIBLIOTECA: () => (FormField[]) = () => {
  const arregloCampos: FormField[] = [
    {
      help: 'Ingrese el nombre',
      formControlName: FormLibroBibliotecaEnum.nombre,
      initialValue: "",
      validators: [
        Validators.required,
        Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      type: fieldType.text,
      formGroup: new FormGroup({}),
      valid: false,
      label: 'Nombre',
      placeholder: 'Ej: Luis Rivera',
      column: '6',
      actualValue: '',
    },
    {
      help: 'Ingrese el isbn',
      formControlName: FormLibroBibliotecaEnum.isbn,
      initialValue: "",
      validators: [
        Validators.required,
      ],
      type: fieldType.text,
      formGroup: new FormGroup({}),
      valid: false,
      label: 'ISBN',
      placeholder: 'Ej: ISBN1234',
      column: '6',
      actualValue: '',
    },
    {
      help: 'Selecciona un genero libro',
      formControlName: FormLibroBibliotecaEnum.generoLibro,
      initialValue: '',
      validators: [
        Validators.required
      ],
      type: fieldType.autoComplete,
      formGroup: new FormGroup({}),
      valid: false,
      label: 'Genero libro',
      placeholder: 'Ej: Drama/Terror',
      autoComplete: {
        field: 'nombre',
        inputId: 'nombre',
        suggestions: []
      },
      column: '6'
    },
    {
      label: 'Descripcion',
      help: 'Ingrese la descripcion',
      placeholder: 'Ej: El libro trata de ...',
      formControlName: FormLibroBibliotecaEnum.descripcion,
      validators: [
      ],
      type: fieldType.text,
      formGroup: new FormGroup({}),
      valid: false,
      initialValue: '',
      column: '6',
      actualValue: '',
    },
  ]
  return arregloCampos;
}
