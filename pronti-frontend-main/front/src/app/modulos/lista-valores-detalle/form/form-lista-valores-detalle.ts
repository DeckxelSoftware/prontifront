import {FormGroup, Validators} from '@angular/forms';
import {FormListaValoresDetalleEnum} from './form-lista-valores-detalle.enum';
import {fieldType, FormField} from '../../../componentes/forms/interfaces/form-field';
import {REGEX_LETRAS_ESPACIOS} from '../../../constantes/form/regex/letras-espacios';


export const FORM_LISTA_VALORES_DETALLE: () => (FormField[]) = () => {
  const arregloCampos: FormField[] = [
    {
      type: fieldType.text,
      label: 'Nombre',
      formControlName: FormListaValoresDetalleEnum.nombre,
      placeholder: 'Ej: Ecuador',
      initialValue: "",
      help: 'Ingrese el nombre',
      patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        Validators.required,
        Validators.maxLength(50),
        Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
    },
    {
      label: 'Tipo de valor',
      placeholder: 'Ej: Género libros',
      help: 'Seleccione un tipo de valor',
      formControlName: FormListaValoresDetalleEnum.listaValoresTipo,
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
      type: fieldType.text,
      label: 'Código primario',
      formControlName: FormListaValoresDetalleEnum.codigoPrimario,
      placeholder: 'Ej: GL-1',
      initialValue: "",
      help: 'Ingrese el código primario',
      validators: [
        Validators.required,
        Validators.maxLength(255),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
    },
    {
      type: fieldType.text,
      label: 'Código secundario',
      formControlName: FormListaValoresDetalleEnum.codigoSecundario,
      placeholder: 'Ej: GEN-LIBRO-1',
      initialValue: "",
      help: 'Ingrese el código secundario',
      validators: [
        Validators.required,
        Validators.maxLength(255),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
    },
    {
      type: fieldType.text,
      label: 'Descripción',
      formControlName: FormListaValoresDetalleEnum.descripcion,
      placeholder: 'Ej: Valor de ...',
      initialValue: "",
      help: 'Ingrese una descripción',
      validators: [
        Validators.minLength(2),
        Validators.maxLength(255),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
    },
  ]
  return arregloCampos;
}
