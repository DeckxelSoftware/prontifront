import {fieldType, FormField, TipoArchivo} from '../../../componentes/forms/interfaces/form-field';
import {FormArchivoEnum} from '../../archivo/form/form-archivo.enum';
import {FormGroup, Validators} from '@angular/forms';

export const FORM_IMAGEN_LIBRO_BIBLIOTECA: () => (FormField[]) = () => {
  const arregloCampos: FormField[] = [
    {
      label: 'Imágen',
      placeholder: 'Ej: Imágen libro.jpg',
      help: 'Selecciona una imagen',
      formControlName: FormArchivoEnum.file,
      initialValue: '',
      validators: [
        Validators.required,
      ],
      type: fieldType.file,
      formGroup: new FormGroup({}),
      valid: false,
      column: '12',
      actualValue: '',
      file: {
        tamanioMaximoEnBytes: 1000000 * 10,
        accept: '.png, .jpg',
        typo: TipoArchivo.Archivo
      }
    }
  ]
  return arregloCampos
}
