import {fieldType, FormField, TipoArchivo} from "../../../componentes/forms/interfaces/form-field";
import {FormArchivoEnum} from "../../archivo/form/form-archivo.enum";
import {FormGroup, Validators} from "@angular/forms";

export const FORM_ARCHIVO_PLAN: () => (FormField[]) = () => {
  const arregloCampos: FormField[] = [
    {
      label: 'Archivo',
      placeholder: 'Ej: File',
      help: 'Selecciona un archivo',
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
        tamanioMaximoEnBytes: 1000000 * 2,
        accept: '',
        typo: TipoArchivo.Archivo
      }
    },
  ]
  return arregloCampos;
}
