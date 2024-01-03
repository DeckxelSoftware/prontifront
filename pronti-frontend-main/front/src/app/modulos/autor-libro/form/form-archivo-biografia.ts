import {fieldType, FormField, TipoArchivo} from '../../../componentes/forms/interfaces/form-field';
import {FormGroup} from '@angular/forms';
import {FormArchivoEnum} from '../../archivo/form/form-archivo.enum';

export const FORM_ARCHIVO_BIOGRAFIA: () => (FormField[]) = () => {
  const arregloCampos: FormField[] = [
    {
      label: 'Biografía PDF',
      placeholder: 'Ej: File ',
      help: 'Selecciona un archivo',
      formControlName: FormArchivoEnum.file,
      initialValue: '',
      validators: [
        // Validators.required,
      ],
      type: fieldType.file,
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
      file: {
        tamanioMaximoEnBytes: 1000000 * 10,
        accept: '.pdf',
        typo: TipoArchivo.Archivo
      }
    },
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
