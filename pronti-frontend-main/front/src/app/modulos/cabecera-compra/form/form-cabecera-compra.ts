import {FormGroup, Validators} from '@angular/forms';
import {FormCabeceraCompraEnum} from './form-cabecera-compra.enum';
import {fieldType, FormField, TipoArchivo} from "../../../componentes/forms/interfaces/form-field";


export const FORM_CABECERA_COMPRA: () => (FormField[]) = () => {
  const arregloCampos: FormField[] = [
    {
      type: fieldType.file,
      label: 'XML',
      formControlName: FormCabeceraCompraEnum.xml,
      placeholder: '',
      initialValue: "",
      help: 'Seleccione el xml a cargar',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        Validators.required,
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      file: {
        typo: TipoArchivo.Archivo,
        accept: 'text/xml',
        tamanioMaximoEnBytes: 10000000
      },
      formGroup: new FormGroup({}),
      valid: false,
      column: '12',
      actualValue: '',
    },
  ]
  return arregloCampos;
}
