import {FormGroup, Validators} from '@angular/forms';
import {fieldType, FormField, TipoArchivo} from '../../../componentes/forms/interfaces/form-field';
import {REGEX_LETRAS_ESPACIOS} from '../../../constantes/form/regex/letras-espacios';
import {CELULAR_MASK} from '../../../constantes/form/celular-placeholder-mask/celular-mask';
import {CELULAR_PLACEHOLDER} from '../../../constantes/form/celular-placeholder-mask/celular-placeholder';
import {SELECT_DIAS_SEMANA} from '../../../constantes/form/select/dias-semana';

export const FORM_EJEMPLO: () => (FormField[]) = () => {
  const arregloCampos: FormField[] = [
    {
      label: 'Texto',
      placeholder: 'Ej: Algun texto',
      help: 'Ingrese el texto, de 2 a 6 caracteres solo espacios y letras.',
      formControlName: 'texto',
      initialValue: '',
      validators: [
        Validators.required,
        Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
        Validators.minLength(2),
        Validators.maxLength(6),
      ],
      patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      type: fieldType.text,
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
    },
    {
      label: 'Password',
      placeholder: 'Ej: XXXXXXXXX',
      help: 'Ingrese un password',
      formControlName: 'password',
      initialValue: '',
      validators: [
        Validators.required,
      ],
      type: fieldType.password,
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
    },
    {
      label: 'Correo',
      placeholder: 'Ej: mail@domain.com',
      help: 'Ingrese un correo valido',
      formControlName: 'mail',
      initialValue: '',
      validators: [
        Validators.required,
        Validators.email
      ],
      type: fieldType.email,
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
    },
    {
      label: 'Textarea',
      placeholder: 'Ej: Texto que sea largo',
      help: 'Ingrese un texto largo',
      formControlName: 'textarea',
      initialValue: '',
      validators: [
        Validators.required,
      ],
      type: fieldType.textarea,
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
      textarea: {
        rows: 2,
      },
    },
    {
      label: 'Number',
      placeholder: 'Ej: 2.23',
      help: 'Ingrese un numero',
      formControlName: 'number',
      initialValue: '',
      validators: [
        Validators.required,
      ],
      type: fieldType.number,
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
    },
    {
      label: 'Date',
      placeholder: 'Ej: mm-dd-yyyy',
      help: 'Ingrese una fecha',
      formControlName: 'date',
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
      label: 'Mask',
      placeholder: 'Ej: ' + CELULAR_PLACEHOLDER,
      help: 'Ingrese un celular',
      formControlName: 'mask',
      initialValue: '',
      validators: [
        Validators.required,
      ],
      type: fieldType.mask,
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
      mask:{
        maskTemplate: CELULAR_MASK,
        autoClear: true
      }
    },
    {
      label: 'Select',
      placeholder: 'Ej: Lunes/Martes/...',
      help: 'Ingrese un dia de la semana',
      formControlName: 'select',
      initialValue: '',
      validators: [
        Validators.required,
      ],
      type: fieldType.select,
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
      select: SELECT_DIAS_SEMANA
    },
    {
      label: 'Autocomplete',
      placeholder: 'Ej: Quito/Guayaquil/...',
      help: 'Seleccione una sucursal',
      formControlName: 'autocomplete',
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
        field: 'nombre',
        inputId: 'id',
        suggestions: []
      }
    },
    {
      label: 'File',
      placeholder: 'Ej: File',
      help: 'selecciona un archivo',
      formControlName: 'file',
      initialValue: '',
      validators: [
        Validators.required,
      ],
      type: fieldType.file,
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
      file:{
        tamanioMaximoEnBytes: 1000000 * 2,
        accept: '',
        typo: TipoArchivo.Archivo
      }
    },
  ]
  return arregloCampos;
}
